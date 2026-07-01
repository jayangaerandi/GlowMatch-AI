import os
import joblib

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

MODEL_PATH = os.path.join(
    BASE_DIR,
    "beauty_model.pkl"
)

model = joblib.load(MODEL_PATH)

skin_mapping = {

    "Fair": 0,

    "Medium": 1,

    "Tan": 2,

    "Deep": 3

}


def predict_product(skin_tone):

    value = skin_mapping.get(

        skin_tone,

        1

    )

    prediction = model.predict([[value]])

    return int(prediction[0])