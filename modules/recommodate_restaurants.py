import pandas as pd
import numpy as np
import random


def recommodate_restaurants(data, target_user):
    """
    利用所有使用者對餐廳的評論，針對目標用戶，
    找出喜好最相似的其他使用者，並推薦餐廳給他。
    """

    # 將新數據加入原始 DataFrame
    df = pd.DataFrame(data)

    # 建立用戶-餐廳評分矩陣
    user_restaurant_rating = df.pivot_table(
        index="User", columns="Restaurant", values="Rating"
    ).fillna(0)

    # 自定義的餘弦相似度函數
    def cosine_similarity_only_common_ratings(matrix, target_user):
        """
        計算餘弦相似度，
        並且只會考慮兩個使用者都有做出評價的餐廳。
        """

        # 將 0 替換成 nan
        matrix = matrix.replace(0, np.nan)

        # 目標用戶的評分
        target_ratings = matrix.loc[target_user]

        # 建立一個和 matrix 同樣大小的陣列
        similarity_matrix = np.zeros(matrix.shape[0])

        # 兩兩計算內積
        for i, user in enumerate(matrix.index):
            if user == target_user:
                continue

            # 只選取兩個使用者都有做出評價的餐廳
            common_items = ~target_ratings.isna() & ~matrix.loc[user].isna()

            if not common_items.any():
                # 沒有共同評價過某間餐廳，相似度為 0
                continue

            # 得到兩個使用者都有做出評論的評價
            ratings_target = target_ratings[common_items]
            ratings_other = matrix.loc[user, common_items]

            # 做中心化，每個值減掉平均值
            ratings_target -= ratings_target.mean()
            ratings_other -= ratings_other.mean()

            # 計算餘弦相似度，分子為內積，分母為兩範數相乘
            numerator = np.sum(ratings_target * ratings_other)
            denominator = np.sqrt(np.sum(ratings_target**2)) * np.sqrt(
                np.sum(ratings_other**2)
            )
            if denominator == 0:
                # 避免分母為 0 的情況
                continue
            similarity_matrix[i] = numerator / denominator

        return pd.Series(similarity_matrix, index=matrix.index)

    # 使用自定義函數計算相似度
    user_similarity = cosine_similarity_only_common_ratings(
        user_restaurant_rating, target_user
    )

    # 選擇與目標用戶最相似的10位用戶
    n_similar_users = 10
    similar_users = user_similarity.sort_values(ascending=False).index[
        1 : n_similar_users + 1
    ]

    # 找出相似之用戶的所有餐廳評價並計算平均值
    recommendations = (
        user_restaurant_rating.loc[similar_users]
        .replace(0, np.nan)  # Replace 0 with NaN
        .mean()  # Calculate mean ignoring NaN
        .sort_values(ascending=False)
    )

    # 篩選未評分的餐廳
    unrated_restaurants = user_restaurant_rating.loc[target_user][
        user_restaurant_rating.loc[target_user] == 0
    ]
    recommended_restaurants = (
        recommendations[unrated_restaurants.index].sort_values(ascending=False).dropna()
    )

    # 將餐廳之資料刪除整理成推薦後的餐廳排序
    recommended_restaurants_info = df[
        df["Restaurant"].isin(recommended_restaurants.index)
    ].drop_duplicates("Restaurant")
    recommended_restaurants_with_info = recommended_restaurants_info.set_index(
        "Restaurant"
    ).loc[recommended_restaurants.index]
    recommended_restaurants_with_info["Rating"] = recommended_restaurants

    return recommended_restaurants_with_info


if __name__ == "__main__":
    # 初始化資料
    data = {"User": [], "Restaurant": [], "Rating": []}

    # 目標用戶
    target_user = "User444"

    # 假設我們有1000個用戶和11個餐廳
    users = [f"User{i}" for i in range(1, 1000)]
    restaurants = ["A", "B", "C", "D", "E", "F", "I", "J", "K", "L", "M"]

    # 每個用戶隨機對4至6個餐廳進行1至5的評分
    for user in users:
        rated_restaurants = random.sample(restaurants, random.randint(4, 6))
        for restaurant in rated_restaurants:
            data["User"].append(user)
            data["Restaurant"].append(restaurant)
            data["Rating"].append(random.randint(1, 5))

    restaurants = recommodate_restaurants(data, target_user)

    print(restaurants)
