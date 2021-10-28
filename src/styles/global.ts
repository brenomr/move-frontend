/**
 * IMPORTS
 */
import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';
import theme from './theme';

/**
 * I am a global style.
 */
export default createGlobalStyle`
   ${normalize}
   a{
    transition: all ease 0.4s;
   }
   * {
     margin: 0;
     padding: 0;
     box-sizing: border-box;
   }
 
   *,
   *::before,
   *::after {
     box-sizing: inherit;
   }
 
   html {
     box-sizing: border-box;
     height: -webkit-fill-available;
     -ms-overflow-style: scrollbar;
   }
 
   body {
     min-height: 100vh;
     min-height: -webkit-fill-available;
   }
 
   img {
     max-width: 100%;
   }
 
   button {
     background-color: transparent;
     border: none;
     box-shadow: none;
     cursor: pointer;
     outline: none;
     padding: 0;
     -webkit-box-shadow: none;
   }
 
   @-ms-viewport {
     width: device-width;
   }
 

   .swal2-modal{
     font-family: ${theme.fonts.secondary};
   }
   .swal2-styled.swal2-confirm{
     background-color: ${theme.colors.secondary};
   }

   .image-gallery-icon{color:#fff;transition:all .3s ease-out;appearance:none;background-color:transparent;border:0;cursor:pointer;outline:0;position:absolute;z-index:4;filter:drop-shadow(0 2px 2px #1a1a1a)}@media (hover:hover) and (pointer:fine){.image-gallery-icon:hover{color:#337ab7}.image-gallery-icon:hover .image-gallery-svg{transform:scale(1.1)}}.image-gallery-icon:focus{outline:2px solid #337ab7}.image-gallery-using-mouse .image-gallery-icon:focus{outline:0}.image-gallery-fullscreen-button,.image-gallery-play-button{bottom:0;padding:20px}.image-gallery-fullscreen-button .image-gallery-svg,.image-gallery-play-button .image-gallery-svg{height:28px;width:28px}@media (max-width:768px){.image-gallery-fullscreen-button,.image-gallery-play-button{padding:15px}.image-gallery-fullscreen-button .image-gallery-svg,.image-gallery-play-button .image-gallery-svg{height:24px;width:24px}}@media (max-width:480px){.image-gallery-fullscreen-button,.image-gallery-play-button{padding:10px}.image-gallery-fullscreen-button .image-gallery-svg,.image-gallery-play-button .image-gallery-svg{height:16px;width:16px}}.image-gallery-fullscreen-button{right:0}.image-gallery-play-button{left:0}.image-gallery-left-nav,.image-gallery-right-nav{padding:50px 10px;top:50%;transform:translateY(-50%)}.image-gallery-left-nav .image-gallery-svg,.image-gallery-right-nav .image-gallery-svg{height:120px;width:60px}@media (max-width:768px){.image-gallery-left-nav .image-gallery-svg,.image-gallery-right-nav .image-gallery-svg{height:72px;width:36px}}@media (max-width:480px){.image-gallery-left-nav .image-gallery-svg,.image-gallery-right-nav .image-gallery-svg{height:48px;width:24px}}.image-gallery-left-nav[disabled],.image-gallery-right-nav[disabled]{cursor:disabled;opacity:.6;pointer-events:none}.image-gallery-left-nav{left:0}.image-gallery-right-nav{right:0}.image-gallery{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;-o-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent;position:relative}.image-gallery.fullscreen-modal{background:#000;bottom:0;height:100%;left:0;position:fixed;right:0;top:0;width:100%;z-index:5}.image-gallery.fullscreen-modal .image-gallery-content{top:50%;transform:translateY(-50%)}.image-gallery-content{position:relative;line-height:0;top:0}.image-gallery-content.fullscreen{background:#000}.image-gallery-content .image-gallery-slide .image-gallery-image{max-height:calc(100vh - 80px)}.image-gallery-content.left .image-gallery-slide .image-gallery-image,.image-gallery-content.right .image-gallery-slide .image-gallery-image{max-height:100vh}.image-gallery-slide-wrapper{position:relative}.image-gallery-slide-wrapper.left,.image-gallery-slide-wrapper.right{display:inline-block;width:calc(100% - 110px)}@media (max-width:768px){.image-gallery-slide-wrapper.left,.image-gallery-slide-wrapper.right{width:calc(100% - 87px)}}.image-gallery-slide-wrapper.image-gallery-rtl{direction:rtl}.image-gallery-slides{line-height:0;overflow:hidden;position:relative;white-space:nowrap;text-align:center}.image-gallery-slide{left:0;position:absolute;top:0;width:100%}.image-gallery-slide.center{position:relative}.image-gallery-slide .image-gallery-image{width:100%;object-fit:contain}.image-gallery-slide .image-gallery-description{background:rgba(0,0,0,.4);bottom:70px;color:#fff;left:0;line-height:1;padding:10px 20px;position:absolute;white-space:normal}@media (max-width:768px){.image-gallery-slide .image-gallery-description{bottom:45px;font-size:.8em;padding:8px 15px}}.image-gallery-bullets{bottom:20px;left:0;margin:0 auto;position:absolute;right:0;width:80%;z-index:4}.image-gallery-bullets .image-gallery-bullets-container{margin:0;padding:0;text-align:center}.image-gallery-bullets .image-gallery-bullet{appearance:none;background-color:transparent;border:1px solid #fff;border-radius:50%;box-shadow:0 2px 2px #1a1a1a;cursor:pointer;display:inline-block;margin:0 5px;outline:0;padding:5px;transition:all .2s ease-out}@media (max-width:768px){.image-gallery-bullets .image-gallery-bullet{margin:0 3px;padding:3px}}@media (max-width:480px){.image-gallery-bullets .image-gallery-bullet{padding:2.7px}}.image-gallery-bullets .image-gallery-bullet:focus{transform:scale(1.2);background:#337ab7;border:1px solid #337ab7}.image-gallery-bullets .image-gallery-bullet.active{transform:scale(1.2);border:1px solid #fff;background:#fff}@media (hover:hover) and (pointer:fine){.image-gallery-bullets .image-gallery-bullet:hover{background:#337ab7;border:1px solid #337ab7}.image-gallery-bullets .image-gallery-bullet.active:hover{background:#337ab7}}.image-gallery-thumbnails-wrapper{position:relative}.image-gallery-thumbnails-wrapper.thumbnails-wrapper-rtl{direction:rtl}.image-gallery-thumbnails-wrapper.left,.image-gallery-thumbnails-wrapper.right{display:inline-block;vertical-align:top;width:100px}@media (max-width:768px){.image-gallery-thumbnails-wrapper.left,.image-gallery-thumbnails-wrapper.right{width:81px}}.image-gallery-thumbnails-wrapper.left .image-gallery-thumbnails,.image-gallery-thumbnails-wrapper.right .image-gallery-thumbnails{height:100%;width:100%;left:0;padding:0;position:absolute;top:0}.image-gallery-thumbnails-wrapper.left .image-gallery-thumbnails .image-gallery-thumbnail,.image-gallery-thumbnails-wrapper.right .image-gallery-thumbnails .image-gallery-thumbnail{display:block;margin-right:0;padding:0}.image-gallery-thumbnails-wrapper.left .image-gallery-thumbnails .image-gallery-thumbnail+.image-gallery-thumbnail,.image-gallery-thumbnails-wrapper.right .image-gallery-thumbnails .image-gallery-thumbnail+.image-gallery-thumbnail{margin-left:0;margin-top:2px}.image-gallery-thumbnails-wrapper.left,.image-gallery-thumbnails-wrapper.right{margin:0 5px}@media (max-width:768px){.image-gallery-thumbnails-wrapper.left,.image-gallery-thumbnails-wrapper.right{margin:0 3px}}.image-gallery-thumbnails{overflow:hidden;padding:5px 0}@media (max-width:768px){.image-gallery-thumbnails{padding:3px 0}}.image-gallery-thumbnails .image-gallery-thumbnails-container{cursor:pointer;text-align:center;transition:transform .3s ease-out;white-space:nowrap}.image-gallery-thumbnail{display:inline-block;border:4px solid transparent;transition:border .3s ease-out;width:100px;background:0 0;padding:0}@media (max-width:768px){.image-gallery-thumbnail{border:3px solid transparent;width:81px}}.image-gallery-thumbnail+.image-gallery-thumbnail{margin-left:2px}.image-gallery-thumbnail .image-gallery-thumbnail-inner{display:block;position:relative}.image-gallery-thumbnail .image-gallery-thumbnail-image{vertical-align:middle;width:100%;line-height:0}.image-gallery-thumbnail.active,.image-gallery-thumbnail:focus{outline:0;border:4px solid #337ab7}@media (max-width:768px){.image-gallery-thumbnail.active,.image-gallery-thumbnail:focus{border:3px solid #337ab7}}@media (hover:hover) and (pointer:fine){.image-gallery-thumbnail:hover{outline:0;border:4px solid #337ab7}}@media (hover:hover) and (pointer:fine) and (max-width:768px){.image-gallery-thumbnail:hover{border:3px solid #337ab7}}.image-gallery-thumbnail-label{box-sizing:border-box;color:#fff;font-size:1em;left:0;line-height:1em;padding:5%;position:absolute;top:50%;text-shadow:0 2px 2px #1a1a1a;transform:translateY(-50%);white-space:normal;width:100%}@media (max-width:768px){.image-gallery-thumbnail-label{font-size:.8em;line-height:.8em}}.image-gallery-index{background:rgba(0,0,0,.4);color:#fff;line-height:1;padding:10px 20px;position:absolute;right:0;top:0;z-index:4}@media (max-width:768px){.image-gallery-index{font-size:.8em;padding:5px 10px}}body{margin:0;padding:0;background:#f4f6f9;color:#222;font-family:Raleway,sans-serif}li,ul{padding:0;margin:0;list-style:none}li{padding:3px 0;display:inline-block}label{margin-left:5px}.gallery-container{margin-top:50px}.app-header{letter-spacing:1px;text-transform:uppercase}.play-button{cursor:pointer;position:absolute;left:0;top:0;bottom:0;right:0;margin:auto;height:60px;width:100px;background-color:rgba(0,0,0,.7);border-radius:5px}.play-button:hover{background-color:rgba(0,0,0,.9)}.play-button:after{content:"";display:block;position:absolute;top:16.5px;left:40px;margin:0 auto;border-style:solid;border-width:12.5px 0 12.5px 20px;border-color:transparent transparent transparent #fff}.close-video::before{content:'✖';cursor:pointer;position:absolute;right:0;top:0;font-size:20px;padding:20px;z-index:1;line-height:.7;display:block;color:#fff}.video-wrapper{position:relative;padding:33.35% 0;height:0}.video-wrapper iframe{position:absolute;top:0;left:0;width:100%;height:100%}.app .image-gallery,.app-sandbox{margin:0 auto;width:65%}@media (max-width:1320px){.app-sandbox-content{padding:0 20px}}.app-sandbox{margin:40px auto;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;-o-user-select:none;user-select:none}.app-buttons li{display:block}@media (max-width:768px){.app-header{font-size:20px}.app-buttons li{display:block;margin:10px 0}.app-buttons li+li{padding:0}.play-button{height:40px;width:65px}.play-button:after{top:11px;left:27px;border-width:8.5px 0 8.5px 12px}.close-video::before{font-size:16px;padding:15px}}@media (max-width:1024px){.app .image-gallery,.app-sandbox{width:100%}}.app-interval-input-group{display:table}.app-interval-label{display:table-cell;vertical-align:middle;padding:6px 12px;font-size:14px;font-weight:400;line-height:1;color:#555;text-align:center;background-color:#eee;border:3px solid #ccc;border-right:none;border-radius:4px;border-top-right-radius:0;border-bottom-right-radius:0}.app-interval-input{-webkit-appearance:none;display:table-cell;margin:0;padding:9px;border-radius:5px;font-size:14px;border:3px solid #ccc;background:#fff;width:100%;border-top-left-radius:0;border-bottom-left-radius:0}input.app-interval-input{width:65px}.app-checkboxes{margin-top:10px}.app-checkboxes li{display:block}
     body {
       font: 400 1rem ${theme.fonts.primary};
     }
 
     *::selection {
       color: white;
       background: ${theme.colors.primaryDark};
     }
 
     *::-webkit-scrollbar {
       width: 0.5rem;
     }
 
     *::-webkit-scrollbar-track {
       border-radius: 40px;
       background: #0001;
     }
 
     *::-webkit-scrollbar-thumb {
       border-radius: 40px;
       background-color: #2225;
       transition: background-color 0.3s ease-out;
     }
 
     *:hover::-webkit-scrollbar-thumb {
       background-color: #2228;
     }
 
     a {
       color: ${theme.colors.secondary};
       &:hover{
         color: ${theme.colors.primary};
       }
     }
 `;
