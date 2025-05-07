import { use, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Hero from './components/Hero'
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

function App() {

  const params = new URLSearchParams(window.location.search);
  const nidValue = params.get('nid');
  const rIdvalue = params.get('rid');
  const idValue = params.get('id');
  const oIdValue = params.get('oid');

  Aos.init({
    duration: 2000,
    easing: 'ease',
  });


  const {
    active, setActive, refresh,
    setReporterdata,
    firstRefresh,
    setLivedata,
    setLocation,
    setFallbackVideo,
    setHerodata,
    setOurdata,
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
    if (idValue && active?.to == 0) {
      setActive({ to: idValue })
    }
  }, [idValue])


  const apiUrl = import.meta.env.VITE_APP_BASEURL;

  const allData = async () => {
    try {
      const response = await axios.get(`${apiUrl}common/1`);
      if (response.data.status) {
        setLocation(response.data.data.location ?? [])
        const allNews = response.data.data.ScrollNews.map(list => list.news)
        setNews(allNews)
        setFallbackVideo(response.data.data.Setting.preload_link)
        setCenterdata(response.data.data.BreakingNews)
        setBannerimg(response.data.data.BannerAds.map(list => list.image !== null ? list.image_path : ''))
        setNewsData(response.data.data.BottomNews.map(list => list.name))
        setDelay(response.data.data.Setting.bottom_news_cycle)
        setBannerdelay(response.data.data.Setting.banner_ads_cycle)
        setAdvertise(response.data.data.Fastival)
        setSponsers(response.data.data.SponsorLogo)
        setProfile({
          ...profile,
          logo: response.data.data.Setting.news_logo ? response.data.data.Setting.news_logo_path : '',
          name: response.data.data.user?.name,
          img: response.data.data.user?.image ? response.data.data.user.image_path + '/' + response.data.data.user.image : null,
          time: response.data.data.create_date,
          view: response.data.data.count,
          share: response.data.data.id,
        })
      }
    } catch (err) {
      console.log(err)
    }
  }

  const allMenu = async () => {
    try {
      const response = await axios.get(`${apiUrl}category/1`);
      if (response.data.status) {
        setMenu(response.data.data.map(list => ({
          to: list.id,
          name: list.name,
        })))
      }
    } catch (err) {
      console.log(err)
    }
  }

  const allMenu2 = async () => {
    try {
      const response = await axios.get(`${apiUrl}cms_menu/1`);
      if (response.data.status) {
        const dynamicMenu = response.data.data.map(list => ({
          to: `our-board/${list.id}`,
          name: list.name,
          slug: list.slug,
        }));
        const staticItem = [
          {
            to: '/our-board/reporter-sign-up',
            name: "Reporter Login",
            slug: "reporter-sign-up",
          }];
        setMenu2([...staticItem, ...dynamicMenu]);
      }
    } catch (err) {
      console.log(err)
    }
  }

  const allMenu3 = async () => {
    try {
      const response = await axios.get(`${apiUrl}cms/1`);
      if (response.data.status) {
        const dynamicMenu = response.data.data.map(list => ({
          to: `cms/${list.id}`,
          name: list.title,
          slug: list.slug,
        }));
        setMenu2(prev => [...prev, ...dynamicMenu]);
      }
    } catch (err) {
      console.log(err)
    }
  }



  const firstVideo = async () => {
    try {
      const response = await axios.get(`${apiUrl}video-schedule/1`);
      if (response.data.status) {
        // let video = []
        // if (response.data.data) video.push({
        //   ...response.data.data,
        //   details: response.data.data?.video
        // })
        const video = response.data.data?.map(list => ({
          details: list.video,
          ...list,
        }))
        // console.log(video)
        setHerodata(video)
        setLivedata(response.data.live ?? [])
        setChange(video[0]?.duration * 1000)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const allDatanews = async () => {
    try {
      const response = await axios.get(`${apiUrl}news/1/${active.to}`);
      if (response.data.status) {
        // setAll(response.data.data.map(list => ({
        //   type: list.type,
        //   ...list,
        // })))


        const step = 9;
        const groupSize = 4;
        let dataList = response.data.data;

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

        response.data.data = dataList;
        setAll(response.data.data)
      }
    } catch (err) {
      console.log("Error fetching data:", err);
    }
  }

  const oidData = async () => {
    try {
      const response = await axios.get(`${apiUrl}cms_menu_details/1/${oIdValue}`);
      if (response.data.status) {
        setOurdata(response.data.data)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const getAllctg = async () => {
    try {
      const response = await axios.get(`${apiUrl}category-video/1`);
      if (response.data.status) {
        setAllctg(response.data.data)
      }
    } catch (err) {
      console.log(err)
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
      allDatanews()
    }
  }, [active, refresh])

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
    try {
      const response = await axios.get(`${apiUrl}news_details/1/${list?.id}`);
      if (response.data.status) {
        setType(response.data.data.type)
        const locations = [];
        if (response.data.data.location) locations.push(response.data.data.location);
        if (response.data.data.location_1) locations.push(response.data.data.location_1);
        if (response.data.data.location_2) locations.push(response.data.data.location_2);
        setLocation(locations)
        setHerodata(response.data.data.blog_image)
        setBannerText(response.data.data.blog_ticker.map(list => list.details))
        setTitle(response.data.data.title)
        setMoreData(response.data.data.description)
        setProfile({
          ...profile,
          video_img: response.data.data.blog_image[0].details,
          name: response.data.data.user.name,
          img: response.data.data.user.image ? response.data.data.user.image_path : null,
          time: response.data.data.create_date,
          view: response.data.data.count,
          share: response.data.data.id,
        })

        // document.querySelector('meta[property="og:title"]').setAttribute("content", response.data.data.title);
        // document.querySelector('meta[property="og:description"]').setAttribute("content", typeof response.data.data.description === 'string' ? response.data.data.description.replace(/(<([^>]+)>)/gi, '') : '');
        // document.querySelector('meta[property="og:image"]').setAttribute("content", `https://img.youtube.com/vi/${response.data.data.blog_image[0].details}/sddefault.jpg`);
        // document.querySelector('meta[property="og:url"]').setAttribute("content", `${protocol}//${host}${port ? `:${port}` : ''}/?nid=${list?.id}`);

        // document.querySelector('meta[name="title"]').setAttribute("content", response.data.data.title);
        // document.querySelector('meta[name="description"]').setAttribute("content", typeof response.data.data.description === 'string' ? response.data.data.description.replace(/(<([^>]+)>)/gi, '') : '');
        // document.querySelector('meta[name="image"]').setAttribute("content", `https://img.youtube.com/vi/${response.data.data.blog_image[0].details}/sddefault.jpg`);
        // document.querySelector('meta[name="url"]').setAttribute("content", `${protocol}//${host}${port ? `:${port}` : ''}/?nid=${list?.id}`);

        // document.title = response.data.data.title;
      }
    } catch (err) {
      console.log(err)
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
    try {
      const response = await axios.get(`${apiUrl}reporter/${id}`);
      if (response.data.status) {
        setReporterdata(response.data.data.user)
        setAll(response.data.data.BreakingNews)
      }
    } catch (err) {
      console.log("Error fetching reporter data:", err);
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
      <div className='sticky top-0 z-50 bg-white'>
        <Menu menu={menu2} />
        <First {...data} />
      </div>
      <Postdata {...data} show={true} />
      <Menu menu={menu} first={true} />
      <Routes>
        {/* <Route path='/web' element={<Check />} /> */}
        <Route path='/' element={<Landingpage {...data} />} />
        <Route path='/ctg/:id' element={<Ctg {...data} />} />
        {/* <Route path='/cms/our-board' element={<Ourboard {...data} />} /> */}
        <Route path='/our-board/reporter-sign-up' element={<Reportersignup {...data} />} />
        <Route path='/our-board/:id' element={<Ourboardmenudata {...data} />} />
        <Route path='/cms/:id' element={<Cmsmenudata {...data} />} />
      </Routes>
    </>
  )
}

export default App
