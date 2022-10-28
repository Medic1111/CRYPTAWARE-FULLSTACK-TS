import classes from "./OptionsBox.module.css";
import Options from "../Options/Options";
import optionsArr from "../../data/data";

const OptionsBox: React.FC = () => {
  return (
    <article className={classes.article}>
      {optionsArr.map((el, index) => {
        return <Options key={`option_${index}`} value={el} />;
      })}
    </article>
  );
};

export default OptionsBox;
