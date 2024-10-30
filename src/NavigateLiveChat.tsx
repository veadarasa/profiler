import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { Button, Tooltip, Overlay } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./navigate-livechat.scss";

// const URL_ENDPOINT = process.env.REACT_APP_API_URL;

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

const BRAND_DATA: BrandData = {
  2120: {
    brandId: "2120",
    brandName: "X8",
    domain: "x8.games",
    phone: "0352.866.866",
    facebook: "https://www.facebook.com/x8giaitrionline",
    telegram: "https://t.me/gamebaix8club",
  },
  4102: {
    brandId: "4102",
    brandName: "GO88.com",
    domain: "go88.com",
    phone: "0388.90.8888 0921.888.888",
    facebook: "https://www.facebook.com/go88chinhhang/",
    telegram: "https://t.me/Go88ChinhHang",
  },
  4103: {
    brandId: "4103",
    brandName: "HITCLUB",
    domain: "hitclub.vin",
    phone: "+84.338.35.8888 +1.646.357.8777",
    facebook: "https://www.facebook.com/hitclubchinhhang/",
    telegram: "https://t.me/HitClubChinhHang",
  },
  4118: {
    brandId: "4118",
    brandName: "hit.club.vn",
    domain: "vic2.club",
    phone: "0377.299.399",
    facebook: "https://www.facebook.com/viccomeback/",
    telegram: "https://t.me/victrolai",
  },
  4121: {
    brandId: "4121",
    brandName: "Yo88",
    domain: "yo88.tv",
    phone: "035.929.8888",
    facebook: "https://www.facebook.com/yo88gamedangcap",
    telegram: "https://t.me/yo88dangcap",
  },
  8116: {
    brandId: "8116",
    brandName: "Top88",
    domain: "top88.vip",
    phone: "058.393.8888",
    facebook: "http://fb.com/gamebaidaigiatop88",
    telegram: "https://t.me/top88gamebaidaigia",
  },
  9070: {
    brandId: "9070",
    brandName: "Fa88",
    domain: "fa88.tv",
    phone: "0393.111.888",
    facebook: "",
    telegram: "",
  },
};

const extractDomain = (): string => {
  try {
    const hostname = new URL(window.location.origin).hostname;

    const domainParts = hostname.split(".");

    if (domainParts.length < 2) {
      throw new Error("Invalid domain structure.");
    }

    const domain = domainParts.slice(-2).join(".");

    return domain;
  } catch (error) {
    console.error("Error extracting domain:", error);
    return "";
  }
};

const urlParams = new URLSearchParams(window.location.search);
const currentUrl = window.location.pathname;

// Split the URL path by '/'
const brandUrl: any = currentUrl.split("/")[2] ?? null;
const xtokenUrl: any = urlParams.get("xtoken") ?? null;

if (brandUrl) {
  sessionStorage.setItem("brand", brandUrl);
}

if (xtokenUrl) {
  sessionStorage.setItem("xtoken", xtokenUrl);
}

const storedBrand = sessionStorage.getItem('brand');
const storedXToken = sessionStorage.getItem('xtoken');

const brand = brandUrl ?? storedBrand;
const xtoken = xtokenUrl ?? storedXToken;


function NavigateLiveChat() {

  const [showTooltip, setShowTooltip] = useState(false);
  const [target, setTarget] = useState(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLImageElement>(null);

  const [brandData, setBrandData] = useState<any>({ brandId: brand });
  const history = useHistory();

  useLayoutEffect(() => {
    history.push("/");
  }, []);


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
        setBrandData({ ...getData?.data, ...BRAND_DATA?.[brandIdNumber] });

        document.title = BRAND_DATA?.[brandIdNumber]?.brandName;

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
        phone: "",
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
        `/support/api/v1/log/${brand}?xtoken=${xtoken}&action=${paramTracking}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  const showFooter = () => {
    if (extractDomain() && brandData.brandId === "4102") {
      return (
        <div className="footer">
          <div className="content">
            <div>Hiện nay có rất nhiều trang Giả Mạo.</div>
          </div>
          <div className="content">
            <div>
              Quý khách vui lòng truy cập đúng Địa Chỉ{" "}
              <span className="highlight linkchtext_check">
                <a href={`http://${extractDomain()}`}>{brandData.brandName}</a>
                <div className="image_check">
                  <img
                    src="/images/icon-checks.png"
                    alt={brandData.brandName}
                  />{" "}
                </div>
              </span>
            </div>
          </div>
        </div>
      );
    }
    if (extractDomain() && brandData.brandId === "4103") {
      return (
        <div className="footer">
          <div className="content">
            <div>
              <span className="highlight">
                <a href={`http://${extractDomain()}`}>{brandData.domain}</a>
              </span>{" "}
              là tên miền mới nhất của {brandData.brandName}
            </div>
          </div>
          <div className="content">
            <div>Quý khách lưu ý để chơi game an toàn.</div>
          </div>
        </div>
      );
    }
    return <></>;
  };

  return (
    <div>
      {!isMobile && (
        <div className="sub-actions">
          {brandData?.phone && (
            <div className="sub-button">
              <img
                id={brandData.brandId}
                src={`/images/phone.svg`}
                className={`main-logo logo-name`}
                onClick={handleClickPhone}
                ref={buttonRef}
                alt={brandData.brandName}
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
          )}
          {brandData?.facebook && (
            <div className="sub-button">
              <img
                id={brandData.brandId}
                src={`/images/fb.svg`}
                className={`main-logo logo-name`}
                onClick={() => handleClick(brandData?.facebook, "FB")}
                alt={brandData.brandName}
              />
            </div>
          )}
          {brandData?.telegram && (
            <div className="sub-button">
              <img
                id={brandData.brandId}
                src={`/images/tele.svg`}
                className={`main-logo logo-name`}
                onClick={() => handleClick(brandData?.telegram, "TELE")}
                alt={brandData.brandName}
              />
            </div>
          )}
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
                    alt={brandData.brandName}
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
                  {brandData?.phone && (
                    <>
                      <img
                        id={brandData.brandId}
                        src={`/images/phone.svg`}
                        className={`main-logo logo-name`}
                        onClick={handleClickPhone}
                        ref={buttonRef}
                        alt={brandData.brandName}
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
                    </>
                  )}
                  {brandData?.facebook && (
                    <img
                      id={brandData.brandId}
                      src={`/images/fb.svg`}
                      className={`main-logo logo-name`}
                      onClick={() => handleClick(brandData?.facebook, "FB")}
                      alt={brandData.brandName}
                    />
                  )}
                  {brandData?.telegram && (
                    <img
                      id={brandData.brandId}
                      src={`/images/tele.svg`}
                      className={`main-logo logo-name`}
                      onClick={() => handleClick(brandData?.telegram, "TELE")}
                      alt={brandData.brandName}
                    />
                  )}
                </div>
              )}
              {showFooter()}
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
