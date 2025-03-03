import torch
import numpy as np
from realesrgan import RealESRGANer
from basicsr.archs.rrdbnet_arch import RRDBNet
from PIL import Image
import sys
import os

# Get paths from command-line arguments
if len(sys.argv) < 3:
    print("Usage: python upscale.py <input_image> <output_image>")
    sys.exit(1)

input_path = sys.argv[1]
output_path = sys.argv[2]

# Check if input image exists
if not os.path.exists(input_path):
    print(f"Error: Input image not found at {input_path}")
    sys.exit(1)

# Set device
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print(f"Using device: {device}")

# Define model
model = RRDBNet(num_in_ch=3, num_out_ch=3, num_feat=64, num_block=23, num_grow_ch=32, scale=4)
model_path = r"D:\pbll\weights\RealESRGAN_x4plus.pth"

if not os.path.exists(model_path):
    print(f"Error: Model weights not found at {model_path}")
    sys.exit(1)

# Initialize ESRGAN
upsampler = RealESRGANer(
    scale=4,
    model_path=model_path,
    model=model,
    tile=0,
    tile_pad=10,
    pre_pad=0,
    half=device.type == "cuda",
    device=device
)

# Load image
image = Image.open(input_path).convert("RGB")
image_np = np.array(image)

# Upscale
print("Upscaling image...")
output_np, _ = upsampler.enhance(image_np, outscale=4)

# Save output
output_image = Image.fromarray(output_np)
output_image.save(output_path)
print(f"Upscaling complete! Output saved at: {output_path}")
