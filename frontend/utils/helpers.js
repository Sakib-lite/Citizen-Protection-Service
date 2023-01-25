export const getProperThumbnail = (file) => {

    const mimeType = file.fileInfo.type;
    const [type, subtype] = mimeType.split('/'); // ex: type: "application", subtype: "pdf"

    const imageTypes = ['png', 'jpg', 'jpeg', 'gif'];
    const videoTypes = ['mp4', 'webm', 'ogg', 'mpeg', 'mp2t', '3gpp', '3gpp2'];
    const docTypes = ['msword', 'doc', 'docx', 'rtf', 'vnd.openxmlformats-officedocument.wordprocessingml.document'];


    if (imageTypes.includes(subtype)) {
        // then the file is an image, so return its dataURL to be shown on the browser
        return file.dataURL;
    }
    else if (docTypes.includes(subtype)) {
        return "https://i.imgur.com/3o1fJ7R.png";
        // return "../../../../public/images/docImage.png";
    }
    else if (['pdf'].includes(subtype)) {
        return "https://i.imgur.com/oRMlYfk.png";
        // return "../../../../public/images/pdf.png";
    }
    else if (videoTypes.includes(subtype)) {
        return "https://i.imgur.com/U4AzWU3.png";
        // return "../../../../public/images/video.png"
    }
    else if (type === "text") {
        // for ex: text/json, text/csv, text/css, text/javascript, text/html, ...
        return "https://i.imgur.com/BtWCADl.png";
        // return "../../../../public/images/textSlash.png"
    }
    return "https://i.imgur.com/mB2nYfw.png";
}


export const sliceName=(name)=>{
let firstPart=name.split('.')[0]
firstPart=firstPart.slice(0,11)
return firstPart
}