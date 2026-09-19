#!/usr/bin/env python3
"""
Generate a premium medical cosmetology hero image for Alexis Hospital cosmetology page.
Uses Stable Diffusion to create a luxury aesthetic clinic environment.
"""

import torch
from diffusers import StableDiffusionXLPipeline
from PIL import Image
import os

def generate_cosmetology_hero_image():
    """Generate premium cosmetology hero image using Stable Diffusion XL."""
    
    # Define the detailed prompt for the image
    prompt = (
        "Ultra-realistic 4K professional photograph of a luxury modern cosmetology clinic consultation room. "
        "A beautiful professional female cosmetologist is examining and consulting with a young female patient about facial skin treatments. "
        "The cosmetologist is carefully inspecting the patient's face with professional expertise. "
        "Modern advanced laser treatment equipment visible in the background with glowing soft lights. "
        "Digital skin analysis display screen showing detailed skin assessment in the clinic. "
        "Luxury clinic interior with clean white walls, soft purple and rose gold accents, and premium medical aesthetics. "
        "The patient has healthy glowing skin and appears confident and relaxed. "
        "Professional studio lighting with soft depth of field, premium healthcare branding aesthetic. "
        "High-end medical spa atmosphere, luxury skincare clinic environment. "
        "No text, logos, or watermarks. No cartoon style. Natural skin tones and realistic faces. "
        "Professional medical aesthetic setting, elegant and sophisticated."
    )
    
    negative_prompt = (
        "stock photo, watermark, logo, text, cartoon, AI-generated look, artificial, blurry, low quality, "
        "doctors standing, hospital group photo, posed, unnatural, low resolution, distorted, "
        "ugly hands, bad anatomy, multiple people group, hospital corridor"
    )
    
    print("Initializing Stable Diffusion XL pipeline...")
    try:
        # Use the Stable Diffusion XL model for higher quality
        pipe = StableDiffusionXLPipeline.from_pretrained(
            "stabilityai/stable-diffusion-xl-base-1.0",
            torch_dtype=torch.float16 if torch.cuda.is_available() else torch.float32,
            use_safetensors=True,
            variant="fp16" if torch.cuda.is_available() else None
        )
        
        if torch.cuda.is_available():
            pipe = pipe.to("cuda")
            print("Using GPU acceleration")
        else:
            print("Using CPU (this may take longer)")
        
        # Generate the image
        print("Generating premium cosmetology hero image...")
        print(f"Prompt: {prompt[:100]}...")
        
        image = pipe(
            prompt=prompt,
            negative_prompt=negative_prompt,
            num_inference_steps=50,
            guidance_scale=7.5,
            height=1024,
            width=1024,
            generator=torch.Generator().manual_seed(42)
        ).images[0]
        
        # Save the image
        output_path = os.path.join(os.path.dirname(__file__), "img", "Enhanced img.png")
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        
        print(f"Saving image to: {output_path}")
        image.save(output_path, "PNG", quality=95)
        
        print(f"✓ Premium cosmetology hero image successfully generated and saved!")
        print(f"Image size: {image.size}")
        print(f"Image path: {output_path}")
        
        return True
        
    except Exception as e:
        print(f"Error generating image: {str(e)}")
        print("Please ensure you have the required packages installed:")
        print("pip install diffusers transformers torch pillow accelerate safetensors")
        return False

if __name__ == "__main__":
    success = generate_cosmetology_hero_image()
    exit(0 if success else 1)
