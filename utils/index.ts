import _ from "lodash";

//@ts-ignore
/*export const fetcherx = (...args) => fetch(...args).then((res) => res.json());

export async function fetcher(url: string) {
  return fetch(url, {
    method: "GET",
    headers: {
        Authorization: `Bearer ${arg}`
    }
  });
}*/

type ExtraArg = { arg?: { method?: string; path?: string; data?: any } };

export async function argFetcher(url: string, { arg = {} }: ExtraArg) {
  const { method = "GET", path = "", data } = arg;
  const options: any = {
    method: arg.method,
  };
  if (["POST", "PATCH", "PUT"].includes(method)) {
    options.headers = {
      "Content-type": "application/json; charset=UTF-8",
    };
    options.body = JSON.stringify(data);
  }
  return fetch(url + path, options);
}

export const buildRelationQuery = (key: string, value: any) => {
  if (!key) return {};

  let arr: string[] = [];
  arr = arr.concat(key);
  const relations = arr.reduce((result, v) => {
    if (v.includes(".")) {
      const nestedRelations = v
        .split(".")
        .reverse()
        .reduce(
          (res, key) => ({ [key]: Object.keys(res).length > 0 ? res : value }),
          {}
        );
      return _.merge(result, nestedRelations);
    }
    return _.merge(result, { [v]: value });
  }, {});
  return relations;
};
