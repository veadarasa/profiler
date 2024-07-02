import axios from "axios";
import { format } from 'date-fns';
import {
  ArrowRight2,
  CloseCircle
} from "iconsax-react";
import ReactPlayer from "react-player";
import React, { useEffect, useRef, useState } from "react";
import { Button, ProgressBar } from "react-bootstrap";
import ReactLoading from "react-loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./navigate-livechat.scss";

const URL_ENDPOINT = process.env.REACT_APP_API_URL;

const BRAND_CODE = "g88";

const KEY_MAPPING = {
  DOC_SIZE: "inv_doc_img_size",
  DOC_TYPE: "inv_doc_img_type",
  VIDEO_SIZE: "inv_doc_video_size",
  VIDEO_TYPE: "inv_doc_video_type",
}

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
    newDomain: "HITCLUP.TOP",
    brandName: "HIT.CLUP",
    domain: "HIT.CLUP",
    withdrawUrl: "/withdraw",
    depositUrl: "/deposit",
    forgotPasswordUrl: "/forgotPassword",
    anotherIssueUrl: "/other",
    phoneUrl: "/phone",
    fbUrl: "/fb",
    teleUrl: "/tele"
}
function NavigateLiveChat() {
  const imageUploadRef: any = useRef();
  const videoUploadRef: any = useRef();
//   const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);


  const handleClick = (url: string) => {  


  }
  const renderButton = (name: string, url: string) => {
    return <Button onClick={() => handleClick(url)}><span>{name}</span></Button>
  }
  return (
    <div>
      {!isMobile && (
        <div className="sub-actions">
          <div className="sub-button">
            <img id={Brand_dummy_data.brandId} src={`/images/phone.svg`} className={`main-logo logo-name`} />
          </div>
          <div className="sub-button">
            <img id={Brand_dummy_data.brandId} src={`/images/fb.svg`} className={`main-logo logo-name`} />
          </div>
          <div className="sub-button">
            <img id={Brand_dummy_data.brandId} src={`/images/tele.svg`} className={`main-logo logo-name`} />
          </div>
        </div>)
      }
      <article className="navigate-live-chat bg-1">
        <div className="bg-2"/>
        <div className="group-content">
          <div className="center-content">
            <div className="logo row">
                <img id={Brand_dummy_data.brandId} src={`/images/${Brand_dummy_data.logo}.png`} className={`main-logo logo-name`} />
            </div>
            <div className="msg row">
              <span>Quý Khách vui lòng chọn nội dung cần hỗ trợ bên dưới:</span>
            </div>
            <div className="action-group ">
              <div className="button-group">
                {/* <div className="row"> */}
                  {renderButton("NẠP", Brand_dummy_data.withdrawUrl)}
                {/* </div>
                <div className="row"> */}
                  {renderButton("RÚT", Brand_dummy_data.depositUrl)}
                {/* </div>
                <div className="row"> */}
                    {renderButton("QUÊN MẬT KHẨU", Brand_dummy_data.forgotPasswordUrl)}
                {/* </div>
                <div className="row"> */}
                    {renderButton("VẤN ĐỀ KHÁC", Brand_dummy_data.anotherIssueUrl)}
                {/* </div> */}
              </div>
            </div>
            {isMobile && (
              <div className="sub-action-mb">
                {/* <div className="sub-button"> */}
                  <img id={Brand_dummy_data.brandId} src={`/images/phone.svg`} className={`main-logo logo-name`} />
                {/* </div> */}
                {/* <div className="sub-button"> */}
                  <img id={Brand_dummy_data.brandId} src={`/images/fb.svg`} className={`main-logo logo-name`} />
                {/* </div>
                <div className="sub-button"> */}
                  <img id={Brand_dummy_data.brandId} src={`/images/tele.svg`} className={`main-logo logo-name`} />
                {/* </div> */}
              </div>
            )}
            <div className="footer">
                <div className="content">
                    <div>
                      <span className="highlight">{Brand_dummy_data.newDomain}</span> là tên miền mới nhất của <span className="highlight">{Brand_dummy_data.brandName}</span></div>
                  
                </div>
                <div className="content">
                <div>Quý khách có thể truy cập <span className="highlight">{Brand_dummy_data.domain}</span> để kiểm tra chính hãng.</div>
                  
                </div>
                
            </div>
          </div>
        </div>
        
      </article>
    </div>
    
  );
}

export default NavigateLiveChat;
