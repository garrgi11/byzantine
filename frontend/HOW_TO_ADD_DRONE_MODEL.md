# How to Add the Sketchfab Drone Model

The BallPit component now supports loading 3D drone models in GLTF/GLB format!

## Steps to add the DJI Mini 2 drone model:

### Option 1: Download from Sketchfab (if available)
1. Visit: https://sketchfab.com/3d-models/drone-dji-mini-2-73a8c297b75e4686ae40fd44c0b96a55
2. Click "Download 3D Model" button (requires free Sketchfab account)
3. Select "GLTF" format and download
4. Extract the downloaded file
5. Rename the `.glb` file to `drone.glb`
6. Place it in `frontend/public/models/drone.glb`
7. Refresh your browser - the drones will automatically use the 3D model!

### Option 2: Use an alternative drone model
If the Sketchfab model isn't available for download, you can use any other drone model:

**Free drone model sources:**
- Sketchfab (filter by "Downloadable"): https://sketchfab.com/search?q=drone&type=models&features=downloadable
- Poly Pizza: https://poly.pizza/search/drone
- Free3D: https://free3d.com/3d-models/drone
- TurboSquid Free: https://www.turbosquid.com/Search/3D-Models/free/drone

**Requirements:**
- Format: GLTF (.glb or .gltf)
- Size: Keep it under 5MB for best performance
- File name: Must be named `drone.glb`
- Location: `frontend/public/models/drone.glb`

## Current Behavior:
- ✅ If `drone.glb` is found, it will use the 3D model
- ✅ If not found, it falls back to procedural geometry (current simple drones)
- ✅ The model is automatically scaled and centered
- ✅ All physics and interactions remain the same

## Testing:
After adding the model, check the browser console:
- Success: "✅ Loaded drone model from /models/drone.glb"
- Fallback: "ℹ️ No drone model found, using procedural geometry"
