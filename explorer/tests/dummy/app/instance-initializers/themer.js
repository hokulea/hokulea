export function initialize(application) {
  const makeup = application.lookup("service:makeup");
  makeup.setTheme("moana");
}

export default {
  initialize
};
