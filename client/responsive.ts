import { css } from "styled-components";

export const mobile = (props: any) => {
  return css`
    @media only screen and (max-width: 391px) {
      ${props}
    }
  `;
};

// export const mobile = (props: any) => {
//   return css`
//     @media only screen and (max-width: 380px) {
//       ${props}
//     }
//   `;
// };

// export const mobile = (props: any) => {
//   return css`
//     @media only screen and (max-width: 380px) {
//       ${props}
//     }
//   `;
// };
