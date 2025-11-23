/**
 * Main application component demonstrating the BirdFlock package.
 * This is a demo showcasing the library with a flock of 15 birds.
 *
 * @component
 * @returns {JSX.Element} Demo page with bird flock and centered text
 */

import BirdFlock from "@/BirdFlock";

/**
 * App component demonstrating BirdFlock usage.
 * @returns {JSX.Element} Full-page demo application
 */
export default function App() {
  return (
    <main>
      <BirdFlock count={15} size={60} topSpeed={4} perchDelaySeconds={2} />

      <div>
        <style>{`
          main {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
          }
          div {
            text-align: center;
          }
        `}</style>
        <div>
          <h1>Bird Flock</h1>
          <p>Move your mouse around to unsettle the birds</p>
          <p>They'll perch when you're idle</p>
        </div>
      </div>
    </main>
  );
}
