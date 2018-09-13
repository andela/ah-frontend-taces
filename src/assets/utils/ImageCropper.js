export const generatePhotoLink = url => {
  if (url != null && url !== '') {
    const urlParts = url.split('/');
    const imageName = urlParts[urlParts.length - 1];
    const final = `http://res.cloudinary.com/ronzalo777/image/upload/if_ils_gt_0.5,w_120,h_150,c_pad/if_else,w_300,h_300,c_fill,g_face/${imageName}`;
    return final;
  }
  return '';
};
export default generatePhotoLink;
