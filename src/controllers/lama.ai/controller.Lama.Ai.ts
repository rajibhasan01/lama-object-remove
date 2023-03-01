/** External */
import { execSync } from 'child_process';

/** Lama Photo Edit */

export const lamaPhotoEdit = async(req:any, res: any) => {
    try{
        let inputDir = req?.dirPath;
        const lamaPath = "/Users/bcl_web/Desktop/office/android_team/lama";
        if(inputDir){
            const subPath = inputDir.split('/')[3];
            inputDir = "/Users/bcl_web/Desktop/office/android_team/server/uploaded-image/lama/" + subPath;
            const cmd = `python ${lamaPath}/bin/predict.py model.path="${lamaPath}/big-lama" indir="${inputDir}" outdir="${inputDir}/output"`;
            execSync(cmd, { encoding: 'utf-8' });
            res.status(200).json({
                'baseUrl' : "http://172.23.10.167:5001/",
                "imgPath" : ['lama/' + subPath + '/output/' + req?.lamaFileName]
            });
        } else {
            res.status(400).json({"message": 'something went wrong'});
        }
    }catch(error){
        res.status(400).json({"message": 'something went wrong'});
    }
}