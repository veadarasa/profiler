import React, { useEffect, useState } from "react";

import axios from "axios";
import { Button } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import "./navigate-livechat.scss";

const URL_ENDPOINT = process.env.REACT_APP_API_URL;

const BRAND_LIST: {
  [key: number]: string;
} = {
  4102: "Go88",
  4103: "HitClub",
  4121: "Yo88",
  2120: "X8",
  8116: "TOP88",
  9070: "FA88",
  4118: "VIC"}

const isMobile = navigator.userAgent.match(/mobile/i);

const Brand_dummy_data = {
    brandId: "4103",
    logo: "4103",
    domain: "HITCLUP.TOP",
    brandName: "HIT.CLUP",
    domain1: "HIT.CLUP",
    withdrawUrl: "/withdraw",
    depositUrl: "/deposit",
    forgetUrl: "/forgotPassword",
    otherUrl: "/other",
    phone: "/phone",
    fbUrl: "/fb",
    telegram: "/tele",
    brand: "hitclup"
}
function NavigateLiveChat() {

  const urlParams = new URLSearchParams(window.location.search);
  const currentUrl = window.location.pathname;

    // Split the URL path by '/'
  const brand = currentUrl.split('/')[2];
  const xtoken = urlParams.get('xtoken');


  const [ brandData, setBrandData ] = useState({
    "brandId": "4103",
    "brandName": "",
    "domain": "",
    "background": null,
    "title": "",
    "depositUrl": "",
    "withdrawUrl": "",
    "forgetUrl": "",
    "otherUrl": "",
    "phone": "1234567890",
    "facebook": "",
    "telegram": "",
    "recommendations": null
  });
  const handleClick = (url: string, paramTracking: string) => {
    logActionTracking(paramTracking);
    window.location.href = url;

  }
  const renderButton = (name: string, url: string, paramTracking: string) => {
    return <Button onClick={() => handleClick(url, paramTracking)}><span>{name}</span></Button>
  }
  function useOnceCall(cb: any, condition = true) {
    const isCalledRef = React.useRef(false);

    useEffect(() => {
      if (condition && !isCalledRef.current) {
        isCalledRef.current = true;
        cb();
      }
    }, [cb, condition]);
  }

  useOnceCall(() => {
    getConfig();
  });


  const getConfig = async () => {
    try {

      const getData = await axios.get(
        `${URL_ENDPOINT}support/api/v1/config/${brand}?xtoken=${xtoken}`
      );
      if (getData.status === 200) {
        setBrandData(getData?.data);
        const brandId: number = getData.data?.brandId;
        document.title = BRAND_LIST?.[brandId];

        const iconLink = document.createElement('link');
        iconLink.rel = 'icon';
        iconLink.href = `/images/${brandId}-fav.png`;

        const appleTouchIconLink = document.createElement('link');
        appleTouchIconLink.rel = 'apple-touch-icon';
        appleTouchIconLink.href = `/images/${brandId}-fav.png`;

        document.head.appendChild(iconLink);
        document.head.appendChild(appleTouchIconLink);
        
      }
    } catch (error) {
      setBrandData({
        "brandId": "",
        "brandName": "",
        "domain": "",
        "background": null,
        "title": "",
        "depositUrl": "",
        "withdrawUrl": "",
        "forgetUrl": "",
        "otherUrl": "",
        "phone": "1234567890",
        "facebook": "",
        "telegram": "",
        "recommendations": null
      })
    }
  };

  const logActionTracking = async (paramTracking: string) => {
    try {
      await axios.post(
        `${URL_ENDPOINT}support/api/v1/log/${brand}?xtoken=${xtoken}&action=${paramTracking}`
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {!isMobile && (
        <div className="sub-actions">
          <div className="sub-button">
            <img id={brandData.brandId} src={`/images/phone.svg`} className={`main-logo logo-name`} onClick={() => handleClick(brandData?.phone, 'PHONE')} />
          </div>
          <div className="sub-button">
            <img id={brandData.brandId} src={`/images/fb.svg`} className={`main-logo logo-name`} onClick={() => handleClick(brandData?.facebook, 'FB')} />
          </div>
          <div className="sub-button">
            <img id={brandData.brandId} src={`/images/tele.svg`} className={`main-logo logo-name`} onClick={() => handleClick(brandData?.telegram, 'TELE')} />
          </div>
        </div>)
      }
      <article className="navigate-live-chat bg-1">
        <div className="bg-2"/>
        
        {brandData.brandId ? 
          <div className="group-content">
              <div className="center-content">
                <div className="logo row">
                  {brandData.brandId &&  <img id={brandData.brandId} src={`/images/${brandData.brandId}.png`} className={`main-logo logo-name`} />}
                  
                </div>
                <div className="msg row">
                  <span>Quý Khách vui lòng chọn nội dung cần hỗ trợ bên dưới:</span>
                </div>
                <div className="action-group ">
                  <div className="button-group">
                      {renderButton("NẠP", brandData.depositUrl, "deposit")}
                      {renderButton("RÚT", brandData.withdrawUrl, "withdraw")}
                      {renderButton("QUÊN MẬT KHẨU", brandData.forgetUrl, "forget")}
                      {renderButton("VẤN ĐỀ KHÁC", brandData.otherUrl, "other")}`
                  </div>
                </div>
                {isMobile && (
                  <div className="sub-action-mb">
                      <img id={brandData.brandId} src={`/images/phone.svg`} className={`main-logo logo-name`} onClick={() => handleClick(brandData?.phone, 'PHONE')} />
                      <img id={brandData.brandId} src={`/images/fb.svg`} className={`main-logo logo-name`} onClick={() => handleClick(brandData?.facebook, 'FB')}/>
                      <img id={brandData.brandId} src={`/images/tele.svg`} className={`main-logo logo-name`} onClick={() => handleClick(brandData?.telegram, 'TELE')}/>
                  </div>
                )}
                {brandData.domain &&
                  <div className="footer">
                    <div className="content">
                        <div>
                          <span className="highlight">{brandData.domain}</span> là tên miền mới nhất của <span className="highlight">{brandData.brandName}</span></div>
                      </div>
                    <div className="content">
                      <div>Quý khách có thể truy cập <span className="highlight"><a href={`http://${brandData.brandName}`}>{brandData.brandName}</a></span> để kiểm tra chính hãng.</div>
                    </div>
                  </div>
                }
                
              </div>
          </div>
          :
          <div className="not-found-container">
            <div>
              <h1>404 - Page Not Found</h1>
              <p>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
            </div>
            
          </div>
        }
        
      </article>
    </div>
    
  );
}

export default NavigateLiveChat;
