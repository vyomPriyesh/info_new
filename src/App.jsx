import { use, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Hero from './components/Hero'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import Landingpage from './pages/Landingpage'
import Aos from 'aos'
import 'aos/dist/aos.css';
import Menu from './components/Menu'
import First from './components/First'
import Postdata from './utilis/Postdata'
import { Modal } from 'flowbite-react'
import axios from 'axios'
import { Userstate } from './context/Userstate'
import Singlecategory from './components/Singlecategory'
import Modalnews from './utilis/Modalnews'
import Ourboard from './pages/Ourboard'

function App() {

  const params = new URLSearchParams(window.location.search);
  const nidValue = params.get('nid');

  Aos.init({
    duration: 2000,
    easing: 'ease',
  });

  const [active, setActive] = useState(0)
  const [modalData, setModaldata] = useState(null)
  const [open, setOpen] = useState(false)
  const [images, setImages] = useState([])
  const [modalText, setModaltext] = useState([])
  const [all, setAll] = useState([])
  const [center, setCenter] = useState(false)
  const [centerRefresh, setCenterRefresh] = useState(0)
  const [centerData, setCenterdata] = useState([])
  const [singleCenter, setSinglecenter] = useState(null)
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

  const [type, setType] = useState(null)
  const [location, setLocation] = useState([])
  const [heroData, setHerodata] = useState([])
  const [change ,setChange] = useState(null)
  const [menu, setMenu] = useState([])
  const [menu2, setMenu2] = useState([])
  const [scrollNews, setNews] = useState()
  const [bannerImg, setBannerimg] = useState([])
  const [newsData, setNewsData] = useState([])
  const [delay, setDelay] = useState(null)
  const [bannerDelay, setBannerdelay] = useState(null)
  const [bannerText, setBannerText] = useState([]);
  const [shareImg, setShareimg] = useState(null)

  const apiUrl = import.meta.env.VITE_APP_BASEURL;

  const allData = async () => {
    try {
      const response = await axios.get(`${apiUrl}common/1`);
      if (response.data.status) {
        setLocation(response.data.data.location ?? [])
        // setMenu(response.data.data.Category.map(list => ({
        //   to: list.id,
        //   name: list.name
        // })))
        // setMenu2(response.data.data.Cms.map(list => ({
        //   to: list.id,
        //   name: list.title
        // })))
        // setHerodata(response.data.data.Video.map(list => ({
        //   ...list,
        //   details: list.video
        // })))
        const allNews = response.data.data.ScrollNews.map(list => list.news)
        setNews(allNews)
        setCenterdata(response.data.data.BreakingNews)
        setBannerimg(response.data.data.BannerAds.map(list => list.image ? list.image_path : ''))
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
      const response = await axios.get(`${apiUrl}cms/1`);
      if (response.data.status) {
        setMenu2(response.data.data.map(list => ({
          to: list.id,
          name: list.title,
          slug: list.slug,
        })))
      }
    } catch (err) {
      console.log(err)
    }
  }


  const firstVideo = async () => {
    try {
      const response = await axios.get(`${apiUrl}video-schedule/1`);
      if (response.data.status) {
        let video = []
        if (response.data.data?.video) video.push({
          ...response.data.data?.video,
          details: response.data.data?.video?.video
        })
        setHerodata(video)
        setChange(video[0]?.duration *1000)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const nextVideoes = async () => {
    try {
      const response = await axios.get(`${apiUrl}next-schedule/1`);
      if (response.data.status) {
        
        // let video = []
        // if (response.data.data?.video) video.push({
        //   ...response.data.data?.video,
        //   details: response.data.data?.video?.video
        // })
        // setHerodata(video)
        // setChange(video[0]?.duration *1000)
      }
    } catch (err) {
      console.log(err)
    }
  }



  useEffect(() => {
    if (!nidValue) {
      allData()
      firstVideo();
      nextVideoes();
    }
    allMenu()
    allMenu2()
  }, [])



  const protocol = window.location.protocol;  // 'http:' or 'https:'
  const host = window.location.hostname;      // e.g., '192.168.29.202'
  const port = window.location.port;

  const changeVideo = async (list) => {
    // console.log(list)
    // return
    if (!list?.center_news) {
      setType(null)
      setLocation(null)
      setHerodata([])
      setShareimg(null)
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
        setShareimg(response.data.data.blog_image[0].details)
        setBannerText(response.data.data.blog_ticker.map(list => list.details))
        setTitle(response.data.data.title)
        setMoreData(response.data.data.description)
        setProfile({
          ...profile,
          video_img: response.data.data.blog_image[0].details,
          name: response.data.data.user.name,
          img: response.data.data.user.image ? response.data.data.user.image_path + '/' + response.data.data.user.image : null,
          time: response.data.data.create_date,
          view: response.data.data.count,
          share: response.data.data.id,
        })
        document.querySelector('meta[property="og:title"]').setAttribute("content", response.data.data.title);
        document.querySelector('meta[property="og:site_name"]').setAttribute("content", 'Info Gujarat');
        document.querySelector('meta[property="og:description"]').setAttribute("content", typeof response.data.data.description === 'string' ? response.data.data.description.replace(/(<([^>]+)>)/gi, '') : '');
        document.querySelector('meta[property="og:image"]').setAttribute("content", `https://img.youtube.com/vi/${response.data.data.blog_image[0].details}/sddefault.jpg`);
        document.querySelector('meta[property="og:url"]').setAttribute("content", `${protocol}//${host}${port ? `:${port}` : ''}/?nid=${list?.id}`);

        document.querySelector('meta[name="title"]').setAttribute("content", response.data.data.title);
        document.querySelector('meta[name="site_name"]').setAttribute("content", 'Info Gujarat');
        document.querySelector('meta[name="description"]').setAttribute("content", typeof response.data.data.description === 'string' ? response.data.data.description.replace(/(<([^>]+)>)/gi, '') : '');
        document.querySelector('meta[name="image"]').setAttribute("content", `https://img.youtube.com/vi/${response.data.data.blog_image[0].details}/sddefault.jpg`);
        document.querySelector('meta[name="url"]').setAttribute("content", `${protocol}//${host}${port ? `:${port}` : ''}/?nid=${list?.id}`);

        document.title = response.data.data.title;
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    const allMenu = async () => {
      const response = await axios.get(`${apiUrl}news/1/${active}`);
      if (response.data.status) {
        // const filtered = response.data.data.filter(list => list.blog_image?.length > 1)
        const filtered = response.data.data.filter(list => list.type == 1)
        // setAll(filtered)
        setAll(filtered)
      }
    }
    allMenu()
  }, [active])

  useEffect(() => {
    if (nidValue) {
      changeVideo({
        id: nidValue
      })
    }
  }, [nidValue])

  const delay2 = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const loopWithDelay = async () => {
    for (let i = 0; i <= centerData.length; i++) {
      await delay2(1500)
      setSinglecenter(centerData[i])
      await delay2(1000)
      setCenter(true)
      await delay2(4000)
      setCenter(false)
      await delay2(2000);
      if (i + 1 == centerData.length) {
        setCenterRefresh((prev) => prev + 1)
      }
    }
  };

  useEffect(() => {
    setCenter(false)
    loopWithDelay()
  }, [centerRefresh, centerData])


  const [modalLocation, setModalLocation] = useState([])
  const [modalHerodata, setModalHerodata] = useState([])

  const openModal = async (id) => {
    try {
      const response = await axios.get(`${apiUrl}breaking_details/1/${id}`);
      if (response.data.status) {
        const locations = [];
        if (response.data.data.location) locations.push(response.data.data.location);
        if (response.data.data.location_1) locations.push(response.data.data.location_1);
        if (response.data.data.location_2) locations.push(response.data.data.location_2);
        setModalLocation(locations)
        setOpen(true)
        setModaldata(response.data.data)
        setImages(response.data.data.blog_image.map(list => list.details))
        setModalHerodata(response.data.data.blog_image)
        setModaltext(response.data.data.blog_ticker.filter(list => list.type == 2))
      }
    } catch (err) {
      console.log(err)
    }
  }

  const data = {
    type,
    location,
    title,
    moreData,
    shareImg,
    profile,
    heroData,
    scrollNews,
    bannerImg,
    newsData,
    delay,
    bannerDelay,
    active,
    all,
    setActive,
    bannerText,
    changeVideo,
    advertise,
    sponsers,
  }

  return (
    <>
      {/* {singleCenter && */}
      <button onClick={() => openModal(singleCenter?.id)} className={`fixed ms-auto text-start flex flex-col text-white rounded-lg w-fit bg top-1/2 p-2 inset-0 h-fit transition-all duration-1000 ease-linear z-50 ${center ? 'translate-x-0 me-3 ' : 'translate-x-full me-0'}`}>
        <h1 className=' font-bold text-xs'>{singleCenter?.name}</h1>
        <span className='text-sm line-clamp-1'>{singleCenter?.title.substring(0, 20)}...</span>
      </button>
      {/* } */}
      <div className='sticky top-0 z-50 bg-white'>
        <Menu menu={menu} first={true} setActive={setActive} />
        <First {...data} />
      </div>
      <Menu menu={menu2} />
      <Postdata {...data} />
      {/* <Singlecategory {...data} /> */}
      <Routes>
        <Route path='/' element={<Landingpage {...data} />} />
        <Route path='/d' element={<Landingpage {...data} />} />
        <Route path='/cms/:id' element={<Ourboard {...data} />} />
      </Routes>
      <Modalnews images={images} open={open} set={setOpen} data={modalData} location={modalLocation} heroData={modalHerodata} type={type} text={modalText} />
    </>
  )
}

export default App
