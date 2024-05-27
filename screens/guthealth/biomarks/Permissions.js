import { PermissionsAndroid, Platform } from "react-native";

export const androidCameraPermission = () =>new Promise(async (resolve, rejected) =>{
    try{
        if(Platform.os==='android' && Platform.Version>22){
            const granted = await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.CAMERA,
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            ]);
            console.log(granted,'granted response')
            if(
                granted['android.permission.CAMERA'] !==  'granted'||
                granted['android.permission.WRITE_EXTERNAL_STORAGE'] !== 'granted'||
                granted['android.permission.EAD_EXTERNAL_STORAGE'] !== 'granted'
            ){
                showError("Don't have requires permission.Please allow permission")
                return resolve(false);
            }
            return resolve(true);
        }
        return resolve(true);
    } catch(error){
        return resolve(false);
    }
})