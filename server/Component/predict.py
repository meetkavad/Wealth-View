import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sb

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
from xgboost import XGBClassifier
from sklearn import metrics
from datetime import datetime

import warnings
warnings.filterwarnings('ignore')

historic_data = {
 
    "timestamp": [
            1707104700,
            1707191100,
            1707277500,
            1707363900,
            1707450300,
            1707709500,
            1707795900,
            1707882300,
            1707968700,
            1708055100,
            1708314300,
            1708400700,
            1708487100,
            1708573500,
            1708659900,
            1708919100,
            1709005500,
            1709091900,
            1709178300,
            1709264700,
            1709523900,
            1709610300,
            1709696700,
            1709783100,
            1710128700,
            1710215100,
            1710301500,
            1710387900,
            1710474300,
            1710733500,
            1710819900,
            1710906300,
            1710992700,
            1711079100,
            1711424700,
            1711511100,
            1711597500,
            1711943100,
            1712029500,
            1712115900,
            1712202300,
            1712288700,
            1712547900,
            1712634300,
            1712720700,
            1712893500,
            1713152700,
            1713239100,
            1713411900,
            1713498300,
            1713757500,
            1713843900,
            1713930300,
            1714016700,
            1714103100,
            1714362300,
            1714448700,
            1714621500,
            1714707900
        ],
    "volume": [
        624762919,
        249855866,
        166753801,
        117672992,
        220190578,
        389284421,
        400673877,
        252396060,
        284629734,
        136095716,
        222980210,
        134072640,
        114645187,
        172188774,
        85253172,
        91726112,
        60296472,
        77320909,
        105860700,
        74783203,
        52574324,
        115253956,
        120174834,
        59575340,
        63463093,
        65379094,
        191612158,
        218653139,
        160183221,
        111196804,
        74817247,
        71356984,
        70691447,
        76449026,
        50935015,
        120301969,
        79330957,
        55190742,
        99675395,
        75480238,
        87262326,
        74266481,
        44069047,
        43696280,
        48274768,
        48418306,
        71102656,
        50348939,
        47681863,
        74207139,
        32690525,
        42558278,
        32505222,
        34351777,
        66165102,
        53824312,
        110494020,
        98993366,
        113971395
    ],
    "open": [
        105.75,
        107.05000305175781,
        102.94999694824219,
        103.75,
        102.19999694824219,
        95.5,
        80.94999694824219,
        84.05000305175781,
        90.9000015258789,
        93.30000305175781,
        94.4000015258789,
        97.5999984741211,
        95.75,
        92.4000015258789,
        94.5,
        90.75,
        92.5,
        90.69999694824219,
        88.0999984741211,
        89,
        91,
        89,
        93.5999984741211,
        91.5,
        90.5999984741211,
        89.94999694824219,
        86.1500015258789,
        78.55000305175781,
        85.05000305175781,
        84.0999984741211,
        82.5,
        83,
        84.0999984741211,
        83.55000305175781,
        85.5,
        86.25,
        90.4000015258789,
        90.6500015258789,
        90.94999694824219,
        92,
        93.80000305175781,
        95,
        94.5,
        92.25,
        91.3499984741211,
        92.0999984741211,
        88.3499984741211,
        88,
        91.69999694824219,
        88.69999694824219,
        88.80000305175781,
        89.0999984741211,
        90.5999984741211,
        90.4000015258789,
        91.44999694824219,
        93.44999694824219,
        93.94999694824219,
        97.44999694824219,
        98.80000305175781
    ],
    "high": [
        115.8499984741211,
        109.0999984741211,
        105.25,
        104.75,
        102.19999694824219,
        95.9000015258789,
        87.8499984741211,
        89.80000305175781,
        96.55000305175781,
        95.9000015258789,
        98.9000015258789,
        98.69999694824219,
        96.5,
        94.9000015258789,
        94.80000305175781,
        94.0999984741211,
        93,
        91.4000015258789,
        89.30000305175781,
        91.6500015258789,
        91.44999694824219,
        93.19999694824219,
        95.5,
        91.55000305175781,
        91.94999694824219,
        90.44999694824219,
        86.5,
        86.69999694824219,
        87.80000305175781,
        85.9000015258789,
        83.5,
        83.75,
        85.3499984741211,
        86.55000305175781,
        86.44999694824219,
        90.5999984741211,
        90.94999694824219,
        90.9000015258789,
        92.8499984741211,
        93.5999984741211,
        95.5,
        95.3499984741211,
        94.69999694824219,
        92.94999694824219,
        93.30000305175781,
        94.19999694824219,
        90.5999984741211,
        91.80000305175781,
        92.94999694824219,
        89.1500015258789,
        89.69999694824219,
        90.5999984741211,
        91.19999694824219,
        91.6500015258789,
        94,
        94.4000015258789,
        96.69999694824219,
        99.19999694824219,
        101.3499984741211
    ],
    "low": [
        98.55000305175781,
        100.0999984741211,
        100.80000305175781,
        100,
        92.5,
        77.6500015258789,
        77.5,
        83.05000305175781,
        89.3499984741211,
        92.0999984741211,
        94.05000305175781,
        94.19999694824219,
        91.55000305175781,
        88.5999984741211,
        91.1500015258789,
        90.55000305175781,
        89.8499984741211,
        87.05000305175781,
        86.05000305175781,
        88.9000015258789,
        88.80000305175781,
        88.19999694824219,
        90.80000305175781,
        89.75,
        89.3499984741211,
        86.30000305175781,
        77.3499984741211,
        73.5999984741211,
        80.5999984741211,
        82,
        81.5,
        80.69999694824219,
        83.4000015258789,
        83.55000305175781,
        84.6500015258789,
        86.25,
        88.69999694824219,
        89.4000015258789,
        89.5999984741211,
        91.1500015258789,
        93.4000015258789,
        92.69999694824219,
        92,
        90.30000305175781,
        90.69999694824219,
        91.8499984741211,
        86.8499984741211,
        87.69999694824219,
        89.05000305175781,
        87,
        88.30000305175781,
        88.9000015258789,
        89.69999694824219,
        90,
        91.1500015258789,
        92.69999694824219,
        93.3499984741211,
        97,
        97.30000305175781
    ],
    "close": [
        103.6500015258789,
        101.25,
        102.69999694824219,
        101.5,
        96.25,
        81,
        85.80000305175781,
        88.55000305175781,
        92.5999984741211,
        92.8499984741211,
        96.80000305175781,
        94.80000305175781,
        92.6500015258789,
        94.0999984741211,
        91.6500015258789,
        92.19999694824219,
        90.19999694824219,
        88.05000305175781,
        88.1500015258789,
        89.8499984741211,
        89.0999984741211,
        92.44999694824219,
        91.5,
        90.05000305175781,
        90.1500015258789,
        86.6500015258789,
        78.1500015258789,
        85.05000305175781,
        82.94999694824219,
        82.5,
        82.44999694824219,
        82.8499984741211,
        84.0999984741211,
        85.05000305175781,
        85.69999694824219,
        88.8499984741211,
        89.69999694824219,
        90.5,
        92.19999694824219,
        93.19999694824219,
        94.69999694824219,
        93.94999694824219,
        92.3499984741211,
        91.1500015258789,
        92.8499984741211,
        92.25,
        88.94999694824219,
        91.19999694824219,
        89.5,
        87.1500015258789,
        88.55000305175781,
        89.75,
        90.25,
        91.05000305175781,
        92.55000305175781,
        93.4000015258789,
        96.19999694824219,
        98,
        99.25
    ],
    "adjclose": [
        102.08378601074219,
        99.72004699707031,
        101.14813995361328,
        99.96627044677734,
        94.79560089111328,
        79.77603912353516,
        84.50350952148438,
        87.21195983886719,
        91.20075225830078,
        91.44697570800781,
        95.33729553222656,
        93.36751556396484,
        91.25,
        94.0999984741211,
        91.6500015258789,
        92.19999694824219,
        90.19999694824219,
        88.05000305175781,
        88.1500015258789,
        89.8499984741211,
        89.0999984741211,
        92.44999694824219,
        91.5,
        90.05000305175781,
        90.1500015258789,
        86.6500015258789,
        78.1500015258789,
        85.05000305175781,
        82.94999694824219,
        82.5,
        82.44999694824219,
        82.8499984741211,
        84.0999984741211,
        85.05000305175781,
        85.69999694824219,
        88.8499984741211,
        89.69999694824219,
        90.5,
        92.19999694824219,
        93.19999694824219,
        94.69999694824219,
        93.94999694824219,
        92.3499984741211,
        91.1500015258789,
        92.8499984741211,
        92.25,
        88.94999694824219,
        91.19999694824219,
        89.5,
        87.1500015258789,
        88.55000305175781,
        89.75,
        90.25,
        91.05000305175781,
        92.55000305175781,
        93.4000015258789,
        96.19999694824219,
        98,
        99.25
    ]       
}

formatted_dates = [datetime.utcfromtimestamp(ts).strftime('%m/%d/%Y') for ts in historic_data['timestamp'] ]
historic_data['timestamp'] = formatted_dates

df = pd.DataFrame(historic_data)
df.head()

plt.figure(figsize=(15,5))
plt.plot(df['close'])
plt.title('NHPC Close price.', fontsize=15)
plt.ylabel('Price in dollars.')
plt.show()

