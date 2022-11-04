import { useContext } from "react";
import { ModalCtx } from "../../features/modal-ctx";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import classes from "./Notes.module.css";

const Notes: React.FC = () => {
  const modalMgr = useContext(ModalCtx);

  return (
    <>
      <Header />
      <ul className={classes.ul}>
        {modalMgr.news.map((obj, index) => {
          return (
            <li key={`NEWS_${index}`} className={classes.li}>
              <img className={classes.img} src={obj.banner_image} />
              <div className={classes.txtBox}>
                <h2 className={classes.h2}>{obj.title}</h2>
                <p className={classes.p}>{obj.summary}</p>
                <a className={classes.a} target="__blank" href={obj.url}>
                  Read more
                </a>
              </div>
            </li>
          );
        })}
      </ul>
      <Footer />
    </>
  );
};

export default Notes;
