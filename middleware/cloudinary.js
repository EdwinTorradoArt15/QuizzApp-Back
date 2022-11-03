import { v2 as cloudinaryV2 } from 'cloudinary';

cloudinaryV2.config({
    cloud_name: 'edwintorrado',
    api_key: '967816159971617',
    api_secret: 'pO5_BS3I1adSByzd3n8h9N5ERWM',
    secure: true
})

export async function uploadImage(filePath){
    return await cloudinaryV2.uploader.upload(filePath, {
      folder: 'QuizzApp'
    })
}