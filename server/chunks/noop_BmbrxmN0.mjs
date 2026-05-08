import { b as baseService, i as isESMImportedImage, v as verifyOptions } from './node_CA4L-ldu.mjs';

const noopService = {
  ...baseService,
  propertiesToHash: ["src"],
  async validateOptions(options) {
    if (isESMImportedImage(options.src) && options.src.format === "svg") {
      options.format = "svg";
    } else {
      delete options.format;
    }
    verifyOptions(options);
    return options;
  },
  async transform(inputBuffer, transformOptions) {
    return {
      data: inputBuffer,
      format: transformOptions.format
    };
  }
};
var noop_default = noopService;

export { noop_default as default };
