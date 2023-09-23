import { makeToday } from "./date";
import { ResTodo } from "./types";

export const makeChart = (data: ResTodo[]) => {
  const result1 = {
    total_length: data.length,
    y: {
      total: 0,
      total_completed: 0,
      total_uncompleted: 0,
      total_held: 0,
    },
    m: {
      total: 0,
      total_completed: 0,
      total_uncompleted: 0,
      total_held: 0,
    },

    d: {
      total: 0,
      total_completed: 0,
      total_uncompleted: 0,
      total_held: 0,
    },
    used_date: 0,
    average_completed: 0,
    average_held: 0,
    average_uncompleted: 0,
    total_completed: 0,
    total_held: 0,
  };

  //current date
  let [cy, cm, cd] = [0, 0, 0];
  //daily total
  let [dt, dc, dh] = [0, 0, 0];
  //total
  let [tt, tc, th, t] = [0, 0, 0, 0];
  //average
  let [ac, ah] = [0, 0];

  data.forEach((item) => {
    const date = new Date(item.date);
    const [y, m, d] = [date.getFullYear(), date.getMonth(), date.getDate() - 1];

    if (item.is_completed) dc++;
    else if (item.is_held) dh++;
    dt++;

    if (cy !== y || cm !== m || cd !== d) {
      tt += dt;
      tc += dc;
      th += dh;
      t++;

      ac += (dc / dt) * 100;
      ah += (dh / dt) * 100;

      cy = y;
      cm = m;
      cd = d;

      dt = 0;
      dc = 0;
      dh = 0;
    }

    const today = makeToday();
    const [ty, tm, td] = [today.getFullYear(), today.getMonth(), today.getDate()];

    if (ty === y) {
      result1.y.total++;
      if (item.is_completed) result1.y.total_completed++;
      else if (item.is_held) result1.y.total_held++;
      else result1.y.total_uncompleted++;
    } else return;

    if (tm === m) {
      result1.m.total++;
      if (item.is_completed) result1.m.total_completed++;
      else if (item.is_held) result1.m.total_held++;
      else result1.m.total_uncompleted++;
    } else return;

    if (td === d) {
      result1.d.total++;
      if (item.is_completed) result1.d.total_completed++;
      else if (item.is_held) result1.d.total_held++;
      else result1.d.total_uncompleted++;
    } else return;
  });

  const result2 = {
    used_date: t,
    average_completed: ac / t,
    average_held: ah / t,
    average_uncompleted: 100 - ac / t - ah / t,
    total_completed: tc,
    total_held: th,
  };

  return Object.assign(result1, result2);
};
