from ai.model import train_model

model = train_model()

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