class Paths {
  public pHome = '/home';
  public goHome = () => this.pHome;

  public pTrimbleMaps = '/TrimbleMaps';
  public goTrimbleMaps = () => this.pTrimbleMaps;

  public pDeckGl = '/DeckGl';
  public goDeckGl = () => this.pDeckGl;

  public pMapLibre = '/MapLibre';
  public goMapLibre = () => this.pMapLibre;
}

export default new Paths();
