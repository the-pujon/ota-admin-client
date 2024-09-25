import { MouseEventHandler } from "react";

export interface CustomButtonProps {
    isDisabled?: boolean;
    btnType?: "button" | "submit";
    containerStyles?: string;
    textStyles?: string;
    title: string;
    icon?: React.ReactNode;
    rightIcon?: string;
    handleClick?: MouseEventHandler<HTMLButtonElement>;
  }
  export interface InavLink {
    id: number;
    url: string;
    title: string;
  }

  export interface ILogo{
    width:number
    height:number
}

export interface ImageType{
  src: string;
  height: number;
  width: number;
  blurDataURL?: string;
};

export interface IMeta{
    limit: number;
    page: number;
    total: number;
    totalPage: number;
  };
