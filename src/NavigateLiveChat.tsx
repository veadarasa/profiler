import React, { useEffect, useRef, useState } from "react";

import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import "./navigate-livechat.scss";
import { Button, Tooltip, Overlay } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

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
  4118: "VIC",
};

type BrandInfo = {
  brandId: string;
  brandName: string;
  domain: string;
  phone: string;
  facebook: string;
  telegram: string;
};

type BrandData = {
  [key: number]: BrandInfo;
};

const isMobile = navigator.userAgent.match(/mobile/i);

const BRAND_DATA:BrandData = {
  4103: {
    brandId: "4103",
    brandName: "HITCLUB",
    domain: "hitclub.fun",
    phone: "84.338.35.8888 1.646.357.8777",
    facebook: "https://www.facebook.com/hitclubchinhhang/",
    telegram: "https://t.me/HitClubChinhHang"
  },
  4102: {
    brandId: "4102",
    brandName: "Go88",
    domain: "go88.com",
    phone: "0388.90.8888 0921.888.888",
    facebook: "https://www.facebook.com/go88chinhhang/",
    telegram: "https://t.me/Go88ChinhHang"
  },
  4121: {
    brandId: "4121",
    brandName: "Yo88",
    domain: "yo88.tv",
    phone: "035.929.8888",
    facebook: "https://www.facebook.com/yo88gamedangcap",
    telegram: "https://t.me/yo88dangcap"
  },
  9070: {
    brandId: "9070",
    brandName: "Fa88",
    domain: "fa88.tv",
    phone: "0393.111.888",
    facebook: "",
    telegram: "https://t.me/fa88otpbot"
  },
  8116: {
    brandId: "8116",
    brandName: "Top88",
    domain: "top88.vip",
    phone: "058.393.8888",
    facebook: "http://fb.com/gamebaidaigiatop88",
    telegram: "https://t.me/top88gamebaidaigia"
  },
  2120: {
    brandId: "2120",
    brandName: "X8",
    domain: "x8.games",
    phone: "0352.866.866",
    facebook: "https://www.facebook.com/x8giaitrionline",
    telegram: "https://t.me/gamebaix8club"
  },
  4118: {
    brandId: "4118",
    brandName: "Vicclub",
    domain: "vic2.club",
    phone: "0377.299.399",
    facebook: "https://www.facebook.com/vicgamebaichienthang",
    telegram: "https://t.me/vicchoilawin"
  },

}
function NavigateLiveChat() {
  const urlParams = new URLSearchParams(window.location.search);
  const currentUrl = window.location.pathname;

  // Split the URL path by '/'
  const brand = currentUrl.split("/")[2];
  const xtoken = urlParams.get("xtoken");
  const [showTooltip, setShowTooltip] = useState(false);
  const [target, setTarget] = useState(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLImageElement>(null);

  const [brandData, setBrandData] = useState<any>({brandId: brand});

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowTooltip(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClick = (url: string, paramTracking: string) => {
    logActionTracking(paramTracking);
    window.location.href = url;
  };
  const renderButton = (name: string, url: string, paramTracking: string) => {
    return (
      <Button onClick={() => handleClick(url, paramTracking)}>
        <span>{name}</span>
      </Button>
    );
  };
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
        `/support/api/v1/config/${brand}?xtoken=${xtoken}`
      );
      if (getData.status === 200) {
        const brandIdNumber = Number(brand);
        setBrandData({...getData?.data, ...BRAND_DATA?.[brandIdNumber]});
        const brandId: number = getData.data?.brandId;
        document.title = BRAND_LIST?.[brandId];

        const iconLink = document.createElement("link");
        iconLink.rel = "icon";
        iconLink.href = `/images/${brandId}-fav.png`;

        const appleTouchIconLink = document.createElement("link");
        appleTouchIconLink.rel = "apple-touch-icon";
        appleTouchIconLink.href = `/images/${brandId}-fav.png`;

        document.head.appendChild(iconLink);
        document.head.appendChild(appleTouchIconLink);
      }
    } catch (error) {
      setBrandData({
        brandId: "",
        brandName: "",
        domain: "",
        background: null,
        title: "",
        depositUrl: "",
        withdrawUrl: "",
        forgetUrl: "",
        otherUrl: "",
        phone: "1234567890",
        facebook: "",
        telegram: "",
        recommendations: null,
      });
    }
  };

  const handleClickPhone = (event: any) => {
    !showTooltip && logActionTracking("PHONE");
    setTarget(event.target);
    setShowTooltip(!showTooltip);
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
            <img
              id={brandData.brandId}
              src={`/images/phone.svg`}
              className={`main-logo logo-name`}
              onClick={handleClickPhone}
              ref={buttonRef}
            />
            <Overlay
              target={target}
              show={showTooltip}
              placement="top"
              ref={tooltipRef}
            >
              {(props) => (
                <Tooltip
                  id="tooltip-right"
                  {...props}
                  className="custom-tooltip"
                >
                  {brandData?.phone}
                </Tooltip>
              )}
            </Overlay>
          </div>
          <div className="sub-button">
            <img
              id={brandData.brandId}
              src={`/images/fb.svg`}
              className={`main-logo logo-name`}
              onClick={() => handleClick(brandData?.facebook, "FB")}
            />
          </div>
          <div className="sub-button">
            <img
              id={brandData.brandId}
              src={`/images/tele.svg`}
              className={`main-logo logo-name`}
              onClick={() => handleClick(brandData?.telegram, "TELE")}
            />
          </div>
        </div>
      )}
      <article className="navigate-live-chat bg-1">
        <div className="bg-2" />

        {brandData.brandId ? (
          <div className="group-content">
            <div className="center-content">
              <div className="logo row">
                {brandData.brandId && (
                  <img
                    id={brandData.brandId}
                    src={`/images/${brandData.brandId}.png`}
                    className={`main-logo logo-name`}
                  />
                )}
              </div>
              <div className="msg row">
                <span>
                  Quý Khách vui lòng chọn nội dung cần hỗ trợ bên dưới:
                </span>
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
                  <img
                    id={brandData.brandId}
                    src={`/images/phone.svg`}
                    className={`main-logo logo-name`}
                    onClick={handleClickPhone}
                    ref={buttonRef}
                  />
                  <Overlay
                    target={target}
                    show={showTooltip}
                    placement="top"
                    ref={tooltipRef}
                  >
                    {(props) => (
                      <Tooltip
                        id="tooltip-right"
                        {...props}
                        className="custom-tooltip"
                      >
                        {brandData?.phone}
                      </Tooltip>
                    )}
                  </Overlay>
                  <img
                    id={brandData.brandId}
                    src={`/images/fb.svg`}
                    className={`main-logo logo-name`}
                    onClick={() => handleClick(brandData?.facebook, "FB")}
                  />
                  <img
                    id={brandData.brandId}
                    src={`/images/tele.svg`}
                    className={`main-logo logo-name`}
                    onClick={() => handleClick(brandData?.telegram, "TELE")}
                  />
                </div>
              )}
              {brandData.domain && (
                <div className="footer">
                  <div className="content">
                    <div>
                      <span className="highlight">{brandData.domain}</span> là
                      tên miền mới nhất của{" "}
                      <span className="highlight">{brandData.brandName}</span>
                    </div>
                  </div>
                  <div className="content">
                    <div>
                      Quý khách có thể truy cập{" "}
                      <span className="highlight">
                        <a href={`http://${brandData.domain}`}>
                          {brandData.brandName}
                        </a>
                      </span>{" "}
                      để kiểm tra chính hãng.
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="not-found-container">
            <div>
              <h1>404 - Page Not Found</h1>
              <p>
                The page you are looking for might have been removed, had its
                name changed, or is temporarily unavailable.
              </p>
            </div>
          </div>
        )}
      </article>
    </div>
  );
}

export default NavigateLiveChat;
