
export const colorLookupTable: Record<string, Record<string, Record<string, string>>> = {
  "v31": {
    "attack_vector": {
      "network": "high",
      "adjacent": "high",
      "local": "medium",
      "physical": "low"
    },
    "attack_complexity": {
      "low": "high",
      "high": "medium"
    },
    "privileges_required": {
        "none": "high",
        "low": "medium",
        "high": "low"
    },
    "user_interaction": {
        "none": "high",
        "required": "medium"
    },
    "scope": {
        "unchanged": "high",
        "changed": "medium"
    },
    "confidentiality_impact": {
        "none": "none",
        "low": "medium",
        "high": "high"
    },
    "integrity_impact": {
        "none": "none",
        "low": "medium",
        "high": "high"
    },
    "availability_impact": {
        "none": "none",
        "low": "medium",
        "high": "high"
    },
}}