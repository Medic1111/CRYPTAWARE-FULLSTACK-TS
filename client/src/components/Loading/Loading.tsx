import classes from "./Loading.module.css";

const Loading: React.FC = () => {
  return (
    <article className={classes.spinnerParent}>
      <div className={classes.spinner}></div>
    </article>
  );
};

export default Loading;
