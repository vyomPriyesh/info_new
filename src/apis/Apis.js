const apiUrl = import.meta.env.VITE_APP_BASEURL;

const API = {

    common: `${apiUrl}common/1`,
    category: `${apiUrl}category/1`,
    cmsMenu: `${apiUrl}cms_menu/1`,
    cmsMenuData: (id) => `${apiUrl}cms_menu/1/${id}`,
    cms: `${apiUrl}cms/1`,
    cmsData: (id) => `${apiUrl}cms/1/${id}`,
    videoSchedule: `${apiUrl}video-schedule/1`,
    ctgNews: (id) => `${apiUrl}news/1/${id}`,
    oidData: (id) => `${apiUrl}cms_menu_details/1/${id}`,
    allCategory: `${apiUrl}category-video/1`,
    newsDetails: (id) => `${apiUrl}news_details/1/${id}`,
    ridData: (id) => `${apiUrl}reporter/${id}`,
    register: `${apiUrl}register/1`,
    shorts: `${apiUrl}shorts-details/1`,
    breakingDetails: (id) => `${apiUrl}breaking_details/1/${id}`,
    subscribe: `${apiUrl}subscribe`,

    // AUTH: {
    //     sendOtp: `${apiUrl}/send_otp`,
    //     login: `${apiUrl}/login`,
    // },

};

export default API;