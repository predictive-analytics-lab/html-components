// Copyright 2018 The Distill Template Authors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import configs from "./rollup.config.common";
import babili from "rollup-plugin-babili";
import serve from "rollup-plugin-serve";

const [componentsConfig, transformsConfig] = configs;

componentsConfig.plugins.push(
  babili({
    comments: false, // means: *remove* comments
    sourceMap: true
  }),
  serve({
    open: true,
    openPage: "/examples/index.html",
    contentBase: ["dist", "examples"],
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    port: 8088
  })
);

export default [componentsConfig, transformsConfig];