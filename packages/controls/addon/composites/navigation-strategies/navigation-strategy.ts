export default interface NavigationStrategy {
  navigate(event: Event): void | boolean;
}
