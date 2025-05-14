import sys
import joblib
import numpy as np
import os

# ✅ Crop-specific expected input ranges
crop_requirements = {
    "apple":       {"N": (0, 40), "P": (120, 145), "K": (195, 205), "temperature": (21.0, 24.0), "humidity": (90.0, 94.9), "ph": (5.5, 6.5), "rainfall": (100.1, 125.0)},
    "banana":      {"N": (80, 120), "P": (70, 95), "K": (45, 55), "temperature": (25.0, 29.9), "humidity": (75.0, 85.0), "ph": (5.5, 6.5), "rainfall": (90.1, 119.8)},
    "blackgram":   {"N": (20, 60), "P": (55, 80), "K": (15, 25), "temperature": (25.1, 34.9), "humidity": (60.1, 70.0), "ph": (6.5, 7.8), "rainfall": (60.4, 74.9)},
    "chickpea":    {"N": (20, 60), "P": (55, 80), "K": (75, 85), "temperature": (17.0, 21.0), "humidity": (14.3, 20.0), "ph": (6.0, 8.9), "rainfall": (65.1, 94.8)},
    "coconut":     {"N": (0, 40), "P": (5, 30), "K": (25, 35), "temperature": (25.0, 29.9), "humidity": (90.0, 100.0), "ph": (5.5, 6.5), "rainfall": (131.1, 225.6)},
    "coffee":      {"N": (80, 120), "P": (15, 40), "K": (25, 35), "temperature": (23.1, 27.9), "humidity": (50.0, 69.9), "ph": (6.0, 7.5), "rainfall": (115.2, 199.5)},
    "cotton":      {"N": (100, 140), "P": (35, 60), "K": (15, 25), "temperature": (22.0, 26.0), "humidity": (75.0, 84.9), "ph": (5.8, 8.0), "rainfall": (60.7, 99.9)},
    "grapes":      {"N": (0, 40), "P": (120, 145), "K": (195, 205), "temperature": (8.8, 42.0), "humidity": (80.0, 84.0), "ph": (5.5, 6.5), "rainfall": (65.0, 74.9)},
    "jute":        {"N": (60, 100), "P": (35, 60), "K": (35, 45), "temperature": (23.1, 27.0), "humidity": (70.9, 89.9), "ph": (6.0, 7.5), "rainfall": (150.2, 199.8)},
    "kidneybeans": {"N": (0, 40), "P": (55, 80), "K": (15, 25), "temperature": (15.3, 24.9), "humidity": (18.1, 25.0), "ph": (5.5, 6.0), "rainfall": (60.3, 149.7)},
    "lentil":      {"N": (0, 40), "P": (55, 80), "K": (15, 25), "temperature": (18.1, 29.9), "humidity": (60.1, 69.9), "ph": (5.9, 7.8), "rainfall": (35.0, 54.9)},
    "maize":       {"N": (60, 100), "P": (35, 60), "K": (15, 25), "temperature": (18.0, 26.5), "humidity": (55.3, 74.8), "ph": (5.5, 7.0), "rainfall": (60.7, 109.8)},
    "mango":       {"N": (0, 40), "P": (15, 40), "K": (25, 35), "temperature": (27.0, 36.0), "humidity": (45.0, 55.0), "ph": (4.5, 7.0), "rainfall": (89.3, 100.8)},
    "mothbeans":   {"N": (0, 40), "P": (35, 60), "K": (15, 25), "temperature": (24.0, 32.0), "humidity": (40.0, 65.0), "ph": (3.5, 9.9), "rainfall": (30.9, 74.4)},
    "mungbean":    {"N": (0, 40), "P": (35, 60), "K": (15, 25), "temperature": (27.0, 29.9), "humidity": (80.0, 90.0), "ph": (6.2, 7.2), "rainfall": (36.1, 59.9)},
    "muskmelon":   {"N": (80, 120), "P": (5, 30), "K": (45, 55), "temperature": (27.0, 29.9), "humidity": (90.0, 95.0), "ph": (6.0, 6.8), "rainfall": (20.2, 29.9)},
    "orange":      {"N": (0, 40), "P": (5, 30), "K": (5, 15), "temperature": (10.0, 34.9), "humidity": (90.0, 95.0), "ph": (6.0, 8.0), "rainfall": (100.2, 119.7)},
    "papaya":      {"N": (31, 70), "P": (46, 70), "K": (45, 55), "temperature": (23.0, 43.7), "humidity": (90.0, 94.9), "ph": (6.5, 7.0), "rainfall": (40.4, 248.9)},
    "pigeonpeas":  {"N": (0, 40), "P": (55, 80), "K": (15, 25), "temperature": (18.3, 37.0), "humidity": (30.4, 69.7), "ph": (4.5, 7.4), "rainfall": (90.1, 198.8)},
    "pomegranate": {"N": (0, 40), "P": (5, 30), "K": (35, 45), "temperature": (18.1, 25.0), "humidity": (85.1, 95.0), "ph": (5.6, 7.2), "rainfall": (102.5, 112.5)},
    "rice":        {"N": (60, 99), "P": (35, 60), "K": (35, 45), "temperature": (20.0, 26.9), "humidity": (80.1, 85.0), "ph": (5.0, 7.9), "rainfall": (182.6, 298.6)},
    "watermelon":  {"N": (80, 120), "P": (5, 30), "K": (45, 55), "temperature": (24.0, 27.0), "humidity": (80.0, 90.0), "ph": (6.0, 7.0), "rainfall": (40.1, 59.8)},
}


# ✅ Basic realistic input bounds
def is_valid_input(data):
    n, p, k, temp, humidity, ph, rainfall = data
    checks = {
        "Nitrogen (N)": 0 <= n <= 145,
        "Phosphorus (P)": 5 <= p <= 150,
        "Potassium (K)": 5 <= k <= 210,
        "Temperature (°C)": 8 <= temp <= 45,
        "Humidity (%)": 13 <= humidity <= 105,
        "pH": 3.3 <= ph <= 10,
        "Rainfall (mm)": 20 <= rainfall <= 300
    }
    invalid = [feature for feature, valid in checks.items() if not valid]
    if invalid:
        print(f"❌ Invalid inputs: {', '.join(invalid)}", file=sys.stderr)
    return len(invalid) == 0

# ✅ Crop-specific input validation
def validate_crop_requirements(crop, data):
    if crop not in crop_requirements:
        return True  # If we don't have data, skip check

    keys = ["N", "P", "K", "temperature", "humidity", "ph", "rainfall"]
    crop_ranges = crop_requirements[crop]

    for i, key in enumerate(keys):
        min_val, max_val = crop_ranges[key]
        if not (min_val <= data[i] <= max_val):
            print(f"❌ '{key}' value {data[i]} not in range for {crop}: {min_val}–{max_val}", file=sys.stderr)
            return False

    return True

try:
    print("📁 CWD:", os.getcwd(), file=sys.stderr)

    # Parse command-line arguments
    input_data = list(map(float, sys.argv[1:]))

    if len(input_data) != 7:
        raise ValueError(f"❌ Expected 7 input features, got {len(input_data)}")

    print("🔍 Input received:", input_data, file=sys.stderr)

    if not is_valid_input(input_data):
        raise ValueError("❌ One or more input values are out of acceptable agricultural range.")

    # Load model and predict
    model = joblib.load("crop_model.pkl")
    input_array = np.array([input_data])
    predicted_crop = model.predict(input_array)[0]

    print(f"🌾 Predicted crop: {predicted_crop}")

    # Validate prediction with crop-specific requirements
    if not validate_crop_requirements(predicted_crop, input_data):
        raise ValueError(f"❌ Input values do not align with expected range for predicted crop: {predicted_crop}")

except Exception as e:
    print(f"❌ Error in script: {e}", file=sys.stderr)
    sys.exit(1)
