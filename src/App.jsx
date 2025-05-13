import { use, useEffect, useState } from 'react'
import './App.css'
import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Landingpage from './pages/Landingpage'
import Aos from 'aos'
import 'aos/dist/aos.css';
import Menu from './components/Menu'
import First from './components/First'
import Postdata from './utilis/Postdata'
import axios from 'axios'
import Reportersignup from './pages/Reportersignup'
import { Helmet } from 'react-helmet'
import { useMyContext } from './context/Allcontext'
import Ctg from './pages/Ctg'
import Singlecenter from './components/Singlecenter'
import Cmsmenudata from './pages/Cmsmenudata'
import Ourboardmenudata from './pages/Ourboardmenudata'
import API from './apis/Apis'
import { apiFunctions } from './apis/apiFunctions'
import Loader from './utilis/Loader'

function App() {

  const params = new URLSearchParams(window.location.search);
  const nidValue = params.get('nid');
  const rIdvalue = params.get('rid');
  const idValue = params.get('id');
  const oIdValue = params.get('oid');

  const { apiPost, apiGet } = apiFunctions();

  Aos.init({
    duration: 2000,
    easing: 'ease',
  });


  const {
    active, setActive,
    setReporterdata,
    firstRefresh,
    setLivedata,
    setLocation,
    setFallbackVideo,
    setHerodata, loading, setLoading, setLogo,
    setOurdata, cuurentId,
    setAllctg, menu, setMenu, menu2, setMenu2
  } = useMyContext();


  const [all, setAll] = useState([])
  const [centerData, setCenterdata] = useState([])
  const [title, setTitle] = useState('')
  const [advertise, setAdvertise] = useState([])
  const [sponsers, setSponsers] = useState([])
  const [moreData, setMoreData] = useState([])

  const [profile, setProfile] = useState({
    name: '',
    logo: '',
    img: '',
    time: '',
    view: '',
    share: '',
  })
  const navigate = useNavigate();
  const [type, setType] = useState(null)
  const [change, setChange] = useState(null)
  const [scrollNews, setNews] = useState()
  const [bannerImg, setBannerimg] = useState([])
  const [newsData, setNewsData] = useState([])
  const [delay, setDelay] = useState(null)
  const [bannerDelay, setBannerdelay] = useState(null)
  const [bannerText, setBannerText] = useState([]);

  useEffect(() => {
    // This runs only once when the component first mounts
    setLoading(true);

    // Optional: simulate finish
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Remove this if you only want to set it once and leave it true

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (idValue && active?.to == 0) {
      setActive({ to: idValue })
    }
  }, [idValue])


  const allData = async () => {
    const response = await apiGet(API.common);
    if (response.status) {
      setLocation(response.data.location ?? [])
      const allNews = response.data.ScrollNews.map(list => list.news)
      setNews(allNews)
      setFallbackVideo(response.data.Setting.preload_link)
      setCenterdata(response.data.BreakingNews)
      setBannerimg(response.data.bannerAds)
      setNewsData(response.data.BottomNews.map(list => list.name))
      setDelay(response.data.Setting.bottom_news_cycle)
      setBannerdelay(response.data.Setting.banner_ads_cycle)
      setAdvertise(response.data.Fastival)
      setSponsers(response.data.SponsorLogo)
      setLogo(response.data.Setting.news_logo ? response.data.Setting.news_logo_path : null,)
      setProfile({
        ...profile,
        logo: response.data.Setting.news_logo ? response.data.Setting.news_logo_path : '',
        name: response.data.user?.name,
        img: response.data.user?.image ? response.data.user.image_path + '/' + response.data.user.image : null,
        time: response.data.create_date,
        view: response.data.count,
        share: response.data.id,
      })
    }
  }

  const allMenu = async () => {
    const response = await apiGet(API.category);
    if (response.status) {
      setMenu(response.data.map(list => ({
        to: list.id,
        name: list.name,
      })))
    }
  }

  const allMenu2 = async () => {
    const response = await apiGet(API.cmsMenu);
    if (response.status) {
      const dynamicMenu = response.data.map(list => ({
        to: `our-board/${list.id}`,
        name: list.name,
        slug: list.slug,
      }));
      const staticItem = [
        {
          to: '/cms/reporter-sign-up',
          name: "Reporter Login",
          slug: "reporter-sign-up",
        }];
      setMenu2([...staticItem, ...dynamicMenu]);
    }
  }

  const allMenu3 = async () => {
    const response = await apiGet(API.cms);
    if (response.status) {
      const dynamicMenu = response.data.map(list => ({
        to: `cms/${list.id}`,
        name: list.title,
        slug: list.slug,
      }));
      setMenu2(prev => [...prev, ...dynamicMenu]);
    }
  }

  const firstVideo = async () => {
    const response = await apiGet(API.videoSchedule);
    if (response.status && response.current_video) {

      const current = response.current_video;
      const next = response.next_video;

      if (cuurentId == current?.video) return;
      const videoArray = [];

      if (current) videoArray.push({ current_video: current })
      if (next) videoArray.push({ next_video: next })

      // let video = []
      // if (response.data) video.push({
      //   ...response.data,
      //   details: response.data?.video
      // })
      // const video = response.data?.map(list => ({
      //   details: list.video,
      //   ...list,
      // }))
      // console.log(video)
      setHerodata(videoArray)
      setLivedata(response.live ?? [])
      // setChange(video[0]?.duration * 1000)
    }
  }

  const allDatanews = async () => {
    const response = await apiGet(API.ctgNews(active.to));
    if (response.status) {
      // setAll(response.data.map(list => ({
      //   type: list.type,
      //   ...list,
      // })))


      const step = 9;
      const groupSize = 4;
      let dataList = response.data;

      const filteredDates = dataList.filter(item => item.type == 1);

      const maxGroups = Math.floor(dataList.length / step);
      const totalNeeded = maxGroups * groupSize;

      const shuffled = filteredDates.sort(() => 0.5 - Math.random());
      const selectedItems = shuffled.slice(0, totalNeeded).map(item => ({
        ...item,
        typeNew: 2
      }));

      const groupedItems = [];
      for (let i = 0; i < selectedItems.length; i += groupSize) {
        groupedItems.push(selectedItems.slice(i, i + groupSize));
      }

      let insertedCount = 0;
      groupedItems.forEach((group, index) => {
        const insertIndex = (index + 1) * step + insertedCount;

        if (insertIndex <= dataList.length) {
          dataList = dataList.filter(
            item => !group.some(pick => pick.id === item.id)
          );

          dataList.splice(insertIndex, 0, {
            typeNew: 2,
            data: group
          });

          insertedCount++;
        }
      });

      dataList = dataList.map(item => {
        if (!item.typeNew) {
          return { ...item, typeNew: 1 };
        }
        return item;
      });

      response.data = dataList;
      setAll(response.data)
    }
  }

  const oidData = async () => {
    const response = await apiGet(API.oidData(oIdValue));
    if (response.status) {
      setOurdata({
        name: response.data.name,
        desegregation: response.data.desegregation,
        mobile: response.data.mobile,
        email: response.data.email,
        image: response.data.image,
        image_path: response.data.image_path,
      })
    }
  }

  const getAllctg = async () => {
    const response = await apiGet(API.allCategory);
    if (response.status) {
      setAllctg(response.data)
    }
  }

  useEffect(() => {
    if (oIdValue) {
      oidData()
    }
  }, [oIdValue])

  const location = useLocation();

  useEffect(() => {
    if (!rIdvalue && active && !location.pathname.includes('/our-board')) {
      const datda = typeof active?.to === 'string' && active.to.includes('/our-board');
      allDatanews()
    }
  }, [active])

  useEffect(() => {
    if (!nidValue) {
      allData()
    }
    getAllctg()
    allMenu()
    allMenu2()
    allMenu3()
  }, [])

  useEffect(() => {
    firstVideo()
  }, [firstRefresh])


  const protocol = window.location.protocol;  // 'http:' or 'https:'
  const host = window.location.hostname;      // e.g., '192.168.29.202'
  const port = window.location.port;

  const changeVideo = async (list) => {
    // console.log(list)
    // return
    if (!list?.center_news) {
      setLivedata([])
      setType(null)
      setLocation(null)
      setHerodata([])
      setBannerText([])
      setTitle('')
      setMoreData('')
      setProfile({
        name: '',
        logo: '',
        img: '',
        time: '',
        view: '',
        share: '',
        video_img: '',
      })
    }
    const response = await apiGet(API.newsDetails(list?.id));
    if (response.status) {
      setType(response.data.type)
      const locations = [];
      if (response.data.location) locations.push(response.data.location);
      if (response.data.location_1) locations.push(response.data.location_1);
      if (response.data.location_2) locations.push(response.data.location_2);
      setLocation(locations)
      setHerodata(response.data.blog_image)
      setBannerText(response.data.blog_ticker.map(list => list.details))
      setTitle(response.data.title)
      setMoreData(response.data.description)
      setProfile({
        ...profile,
        video_img: response.data.blog_image[0].details,
        name: response.data.user.name,
        img: response.data.user.image ? response.data.user.image_path : null,
        time: response.data.create_date,
        view: response.data.count,
        share: response.data.id,
      })

      // document.querySelector('meta[property="og:title"]').setAttribute("content", response.data.title);
      // document.querySelector('meta[property="og:description"]').setAttribute("content", typeof response.data.description === 'string' ? response.data.description.replace(/(<([^>]+)>)/gi, '') : '');
      // document.querySelector('meta[property="og:image"]').setAttribute("content", `https://img.youtube.com/vi/${response.data.blog_image[0].details}/sddefault.jpg`);
      // document.querySelector('meta[property="og:url"]').setAttribute("content", `${protocol}//${host}${port ? `:${port}` : ''}/?nid=${list?.id}`);

      // document.querySelector('meta[name="title"]').setAttribute("content", response.data.title);
      // document.querySelector('meta[name="description"]').setAttribute("content", typeof response.data.description === 'string' ? response.data.description.replace(/(<([^>]+)>)/gi, '') : '');
      // document.querySelector('meta[name="image"]').setAttribute("content", `https://img.youtube.com/vi/${response.data.blog_image[0].details}/sddefault.jpg`);
      // document.querySelector('meta[name="url"]').setAttribute("content", `${protocol}//${host}${port ? `:${port}` : ''}/?nid=${list?.id}`);

      // document.title = response.data.title;
    }
  }




  useEffect(() => {
    if (nidValue) {
      changeVideo({
        id: nidValue
      })
    }
  }, [nidValue])

  const reporterDatahandle = async (id) => {
    const response = await apiGet(API.ridData(id));
    if (response.status) {
      setReporterdata({
        name: response.data.user.name,
        desegregation: 'Reporter',
        mobile: response.data.user.mobile,
        email: response.data.user.email,
        image: response.data.user.image,
        image_path: response.data.user.image_path,
      })
      setAll(response.data.BreakingNews)
    }
  }

  useEffect(() => {
    if (rIdvalue) {
      reporterDatahandle(rIdvalue);
    }
  }, [rIdvalue])

  const data = {
    type,
    title,
    setTitle,
    moreData,
    profile,
    scrollNews,
    bannerImg,
    newsData,
    delay,
    bannerDelay,
    all,
    bannerText,
    changeVideo,
    advertise,
    sponsers,
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // add behavior for clarity
  }, [active]);

  const shareUrl = `${protocol}//${host}${port ? `:${port}` : ''}/?nid=${profile?.share}`

  return (
    <>
      {loading && <Loader />}
      <Helmet>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta property="og:site_name" content="Info Gujarat" />
        <meta property="og:description" content={typeof moreData === 'string' ? moreData.replace(/(<([^>]+)>)/gi, '') : 'Default description'} />
        <meta property="og:image" content={`https://img.youtube.com/vi/${profile?.video_img}/hqdefault.jpg`} />
        <meta property="og:url" content={shareUrl} />

        <meta property="og:title" content={'hh'} />
        <meta name="description" content={typeof moreData === 'string' ? moreData.replace(/(<([^>]+)>)/gi, '') : 'Default description'} />
        <meta name="image" content={`https://img.youtube.com/vi/${profile?.video_img}/hqdefault.jpg`} />
        <meta name="url" content={shareUrl} />
      </Helmet>
      <Singlecenter centerData={centerData} />
      <Menu menu={menu2} />
      <div className='sticky top-0 z-50 bg-white'>
        <First {...data} />
        <Menu menu={menu} first={true} />
      </div>
      <Postdata {...data} show={true} />
      <Routes>
        {/* <Route path='/web' element={<Check />} /> */}
        <Route path='/' element={<Landingpage {...data} />} />
        <Route path='/ctg/:id' element={<Ctg {...data} />} />
        {/* <Route path='/cms/our-board' element={<Ourboard {...data} />} /> */}
        <Route path='/our-board/:id' element={<Ourboardmenudata {...data} />} />
        <Route path='/cms/reporter-sign-up' element={<Reportersignup {...data} />} />
        <Route path='/cms/:id' element={<Cmsmenudata {...data} />} />
      </Routes>
    </>
  )
}

export default App
