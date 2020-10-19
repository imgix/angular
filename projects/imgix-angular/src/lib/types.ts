import imgixUrlParameters from 'imgix-url-params/dist/parameters.json';
type IImgixParamsKey =
  | keyof ImgixUrlParametersSpec['parameters']
  | keyof ImgixUrlParametersSpec['aliases'];
type ImgixUrlParametersSpec = typeof imgixUrlParameters;

// Can be improved
export type IImgixParams = Partial<
  Record<IImgixParamsKey, string | number | boolean | undefined>
>;
