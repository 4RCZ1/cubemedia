import css from '../styles/slider.module.scss';
import FASHNACTV from "./SliderItems/FASHNACTV";
import MERCEDESEQB2022 from "./SliderItems/MERCEDESEQB2022";
import CARSANDCOFFEE2022 from "./SliderItems/CARSANDCOFFEE2022";
import JUWENALIASZCZECIN2022 from "./SliderItems/JUWENALIASZCZECIN2022";
import CandC from "../images/slider/CandC.png";
import Fashnactv from "../images/slider/FASHNACTV.png";
import Mercedeseqb2022 from "../images/slider/EQB.png";
import Juwenalia from "../images/slider/JUWENALIA.png";
import {Fragment, useEffect, useState} from "react";
import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";

const Slider = () => {
  const components = [FASHNACTV, MERCEDESEQB2022, CARSANDCOFFEE2022, JUWENALIASZCZECIN2022];
  const [project, setProject] = useState(null);
  const [scrollOffset, setScrollOffset] = useState(0);
  const SetProject = (index) => {
    setProject(project === index ? null : index);
  }

  const Component = project === null ? () => null : components[project];
  const images = [Fashnactv, Mercedeseqb2022, CandC, Juwenalia];

  const recalculateScrollOffset = () => {
    setScrollOffset(document.getElementsByClassName(css.slider)[0].scrollWidth / components.length);
    console.log(document.getElementsByClassName(css.slider)[0].scrollWidth / components.length);
  }

  useEffect(() => {
    recalculateScrollOffset()
    let timer;
    window.addEventListener('resize', () => {
      clearTimeout(timer);
      timer = setTimeout(recalculateScrollOffset, 100);
    });
  }, [components.length, scrollOffset]);

  const goToNext = () => {
    const slider = document.getElementsByClassName(css.slider)[0];
    console.log("1thing:",slider.scrollLeft + slider.parentElement.scrollWidth)
    console.log("2thing:",slider.scrollWidth)
    if (slider.scrollLeft + slider.parentElement.scrollWidth < slider.scrollWidth) {
      slider.scrollBy({
        top: 0,
        left: scrollOffset,
        behavior: 'smooth'
      })
    } else if (slider.scrollLeft + slider.parentElement.scrollWidth >= slider.scrollWidth) {
      slider.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    } else {
      slider.scrollTo({
        top: 0,
        left: slider.scrollWidth,
        behavior: 'smooth'
      })
    }
  }

  const goToPrevious = () => {
    const slider = document.getElementsByClassName(css.slider)[0];
    console.log(slider.scrollLeft);
    if (slider.scrollLeft - scrollOffset > 0) {
      slider.scrollBy({
        top: 0,
        left: -scrollOffset,
        behavior: 'smooth'
      })
    } else if (slider.scrollLeft === 0) {
      slider.scrollTo({
        top: 0,
        left: slider.scrollWidth - scrollOffset,
        behavior: 'smooth'
      })
    } else {
      slider.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    }
  }

  return (
    <Fragment>
      <div className={css.sliderContainer}>
        <div className={`${css.leftBorder} ${css.sideBorder}`} onClick={goToPrevious}>
          <div className={"arrow-left icon " + css.icon}></div>
        </div>
        <div className={css.slider}>
          {images.map((image, index) => {
            return (
              <div className={css.sliderItem} key={index}>
                <img src={image} alt="slider item" onClick={() => SetProject(index)}/>
              </div>
            )
          })}
        </div>
        <div className={`${css.rightBorder} ${css.sideBorder}`} onClick={goToNext}>
          <div className={"arrow-right icon " + css.icon}></div>
        </div>
      </div>
      <Accordion expanded={project !== null}>
        <AccordionDetails className={css.accordionWrapper}>
          <Component/>
        </AccordionDetails>
      </Accordion>
    </Fragment>
  )
}

export default Slider;