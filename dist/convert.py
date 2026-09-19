from PIL import Image
img = Image.open(r'C:\Users\ECS\.gemini\antigravity-cli\brain\8b62bcf5-ad32-4fc8-8081-24534f569ba4\alexis_logo_transparent_1783846373505.jpg').convert('RGBA')
datas = img.getdata()
newData = []
for item in datas:
    if item[0] > 240 and item[1] > 240 and item[2] > 240:
        newData.append((255, 255, 255, 0))
    else:
        newData.append(item)
img.putdata(newData)
img.save(r'D:\ARC  STACK - WEB STUDIO\Demos Business\Alexis Hospital\Alexis Website\img\alexis_logo.png', 'PNG')
