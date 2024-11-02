function Cotation(props) {
  const { cotation, NombreVues } = props;
  return (
    <div className="cotation">
      <span>
        <i
          className={
            cotation >= 1
              ? 'fa fa-star'
              : cotation >= 0.5
              ? 'fa fa-star-half-alt'
              : 'fa fa-star'
          }
        />
        
      </span>
      <span>
        <i
          className={
                cotation >= 2
              ? 'fa fa-star'
              : cotation >= 1.5
              ? 'fa fa-star-half-alt'
              : 'fa fa-star'
          }
        />
      </span>
      <span>
        <i
          className={
            cotation >= 3
              ? 'fas fa-star'
              : cotation >= 2.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        />
      </span>
      <span>
        <i
          className={
            cotation >= 4
              ? 'fas fa-star'
              : cotation >= 3.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        />
      </span>
      <span>
        <i
          className={
            cotation >= 5
              ? 'fas fa-star'
              : cotation >= 4.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        />
      </span>
      <span> {NombreVues} vues</span>
    </div>
  );
}

export default Cotation;
