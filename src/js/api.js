import axios from 'axios';

// const URL = "https://pixabay.com/api/";
// const KEY = "40728420-bc103c040fbb3ac6f510e1808";

export async function fetchPhoto(q, page, perPage) {
  // const url = `${URL}?key=${KEY}&q=${q}&page=${page}&per_page=${perPage}&image_type=photo&orientation=horizontal&safesearch=true`;
  
    const BASE_URL = "https://pixabay.com/api/";
    const params = {
      key: `40728420-bc103c040fbb3ac6f510e1808`,
      page: page,
      q: q,
      per_page: perPage,
      image_type: `photo`,
      orientation: `horizontal`,
      safesearch: true,
  };
  const response = await axios.get(BASE_URL, {params});
    return response.data;

// const axiosOptions = {
//       method: 'get',
//       url: 'https://pixabay.com/api/',
//       params: {
//         key: `40728420-bc103c040fbb3ac6f510e1808`,
//         q: q,
//         image_type: `photo`,
//         orientation: `horizontal`,
//         safesearch: true,
//         page: page,
//         per_page: perPage,
//       },
//     };

//     const response = await axios.get(axiosOptions);
//     return response.data;
};