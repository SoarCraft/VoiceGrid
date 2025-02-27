import { createStyles } from "antd-style";
import React from "react";
import { ConfigProvider } from "antd";

const useScrollStyle = () => {
  const { getPrefixCls } = React.useContext(ConfigProvider.ConfigContext);
  const antCls = getPrefixCls('table');

  console.log('antCls: ' + antCls)

  return createStyles(({ css }) => ({
    customTable: css`
        .${antCls} {
            .${antCls}-container {
                .${antCls}-body,
                .${antCls}-content {
                    scrollbar-width: thin;
                    scrollbar-color: #eaeaea transparent;
                    scrollbar-gutter: stable;
                }
            }
        }
    `,
  }))();
};

export { useScrollStyle };