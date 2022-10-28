import SearchForm from "../SearchForm/SearchForm";
import classes from "./Header.module.css";

interface Props {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<Props> = ({ setShowModal }) => {
  return (
    <header className={classes.header}>
      <h1 className={classes.h1}>CRYPTAWARE</h1>
      <SearchForm />
      <button
        className={classes.iconBtn}
        onClick={() => {
          setShowModal((prev) => !prev);
        }}
      >
        <span className="material-symbols-outlined">search</span>
      </button>
    </header>
  );
};

export default Header;
