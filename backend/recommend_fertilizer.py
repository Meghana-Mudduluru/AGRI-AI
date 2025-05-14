import sys
import joblib
import numpy as np

# ✅ Full crop-specific NPK requirements from dataset
crop_nutrient_ranges = {
    "maize":        {"N": (35.53, 86.97), "P": (32.89, 177.31), "K": (34.09, 159.56)},
    "rice":         {"N": (35.53, 86.97), "P": (33.85, 163.06), "K": (50.19, 159.56)},
    "wheat":        {"N": (35.53, 86.97), "P": (34.66, 153.62), "K": (44.08, 159.56)},
    "banana":       {"N": (35.53, 86.97), "P": (36.43, 85.87),  "K": (35.47, 159.56)},
    "papaya":       {"N": (35.53, 95.49), "P": (73.49, 177.31), "K": (50.18, 159.56)},
    "grapes":       {"N": (35.53, 65.09), "P": (25.16, 177.31), "K": (29.88, 72.69)},
    "coffee":       {"N": (35.53, 86.97), "P": (36.82, 177.31), "K": (59.39, 159.56)},
    "black gram":   {"N": (35.53, 60.62), "P": (53.46, 177.31), "K": (43.17, 159.56)},
    "mung bean":    {"N": (35.53, 86.97), "P": (45.01, 177.31), "K": (31.37, 159.56)},
    "kidney beans": {"N": (35.53, 86.97), "P": (13.81, 177.31), "K": (32.71, 159.56)},
    "cotton":       {"N": (35.53, 86.97), "P": (41.87, 177.31), "K": (43.34, 159.56)},
    "sugarcane":    {"N": (60.03, 86.97), "P": (27.19, 177.31), "K": (44.21, 159.56)},
    "orange":       {"N": (35.53, 86.97), "P": (49.44, 177.31), "K": (41.44, 153.06)},
    "rubber":       {"N": (35.53, 98.58), "P": (23.34, 58.36),  "K": (46.56, 159.56)},
    # Add more from dataset if needed
}

# ✅ Validate NPK values for a given crop
def validate_crop_nutrients(crop, n, p, k):
    if crop not in crop_nutrient_ranges:
        print(f"⚠️ No NPK data available for crop '{crop}', skipping crop-specific validation.")
        return True

    ranges = crop_nutrient_ranges[crop]
    issues = []

    if not (ranges["N"][0] <= n <= ranges["N"][1]):
        issues.append(f"N={n} not in range {ranges['N']}")
    if not (ranges["P"][0] <= p <= ranges["P"][1]):
        issues.append(f"P={p} not in range {ranges['P']}")
    if not (ranges["K"][0] <= k <= ranges["K"][1]):
        issues.append(f"K={k} not in range {ranges['K']}")

    if issues:
        print("❌ Input validation failed for crop-specific ranges:")
        for issue in issues:
            print("   -", issue)
        return False

    return True

# ✅ Main script
try:
    # Parse command-line arguments
    N = float(sys.argv[1])
    P = float(sys.argv[2])
    K = float(sys.argv[3])
    crop = sys.argv[4].lower()

    # Basic validation
    if N <= 0 or P <= 0 or K <= 0:
        print("❌ Invalid input: N, P, and K must all be greater than zero.")
        sys.exit(1)

    # Crop-specific validation
    if not validate_crop_nutrients(crop, N, P, K):
        sys.exit(1)

    # Load model and encoders
    model = joblib.load('fertilizer_model.pkl')
    crop_encoder = joblib.load('crop_encoder.pkl')
    fertilizer_encoder = joblib.load('fertilizer_encoder.pkl')

    # Encode crop
    crop_encoded = crop_encoder.transform([crop])[0]

    # Predict
    features = np.array([[N, P, K, crop_encoded]])
    prediction_encoded = model.predict(features)[0]

    # Decode fertilizer nam
    fertilizer = fertilizer_encoder.inverse_transform([prediction_encoded])[0]

    print(fertilizer)

except ValueError:
    print("❌ Invalid input: Ensure values are numbers and crop name is valid.")
    sys.exit(1)
except Exception as e:
    print(f"❌ Error: {e}")
    sys.exit(1)
