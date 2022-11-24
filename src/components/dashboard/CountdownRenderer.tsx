import React from "react";
import moment from "moment";
// Random component
const Completionist = () => <span>Expired!</span>;

// Renderer callback with condition
const CountdownRenderer = ({
  days ,
  hours,
  minutes,
  seconds,
  completed,
  total,
  props,
}: {
  days: number ,
  hours: number,
  minutes: number,
  seconds: number,
  completed: boolean,
  total: number,
  props: any,
}) => {
  if (completed) {
    // Render a completed state
    <Completionist />
  } else {
    // Render a countdown
    if (days > 1) {
      return (
        <span className=" tw-text-xs">
          {days}days, {hours}hrs {minutes}min {seconds}sec, until
        </span>
      );
    } else {
      return (
        <span className=" tw-text-xs">
          {hours + 24 * days}hrs {minutes}min {seconds}sec, until
        </span>
      );
    }
  }
};

export default CountdownRenderer;
