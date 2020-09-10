import React,{Component,useState} from 'react';
import {Paper,Grid} from '@material-ui/core';
import CancelButton from '../Reusable/Cancel';
import {Trans, useTranslation} from 'react-i18next';
import i18n from '../i18n/i18n_config';
function CommonComponent(props){
    const supported_languages = {
        hi: 'Hindi',
        
        en: 'English'
      };
      const {t} = useTranslation();
      const [active_lang, set_lang] = useState('hi');
      
  const change_language = (event, lang_code) => {
    event.preventDefault();
    set_lang(lang_code);
    i18n.changeLanguage(lang_code);
  }
        return(
            <>
            <Grid container>
            <Paper style={{
                minHeight: '515px',
                //  minWidth: '315px',
                display: 'inline-block',
                width: '100%',
                marginTop: '5%',
            }}>
              <CancelButton/>  
              <nav>
               {
            Object.keys(supported_languages).map(lang_code => {
              return <span style ={{marginLeft:'2%'}} className={active_lang === lang_code ? 'active' : 'not-active'} 
                          onClick={(e) => change_language(e, lang_code)} key={lang_code}>
                  <a href={lang_code}>{supported_languages[lang_code]}</a>
                </span>;
            })
          }
                </nav> 
            <p style={{color:'red',textAlign:'center',marginTop:'12%',fontSize:'xx-large'}}>
            {t('title')}
                
          </p>

       
            </Paper>
            </Grid>
            </>
        )
    
}
export default CommonComponent;