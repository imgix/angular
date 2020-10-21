import imgixUrlParameters from 'imgix-url-params/dist/parameters.json';
declare type IImgixParamsKey = keyof ImgixUrlParametersSpec['parameters'] | keyof ImgixUrlParametersSpec['aliases'];
declare type ImgixUrlParametersSpec = typeof imgixUrlParameters;
export declare type IImgixParams = Partial<Record<IImgixParamsKey, string | number | boolean | undefined>>;
export {};
