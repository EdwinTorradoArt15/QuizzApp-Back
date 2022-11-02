import { v2 as cloudinaryV2 } from 'cloudinary';

cloudinaryV2.config({
    cloud_name: 'dx5yemlrk',
    api_key: '616947557185632',
    api_secret: 'gl3L0nkGhJnJ1l5mKcSlB3ft4q0',
    secure: true
})

export async function uploadImage(filePath){
    return await cloudinaryV2.uploader.upload(filePath, {
      folder: 'QuizzApp'
    })
}