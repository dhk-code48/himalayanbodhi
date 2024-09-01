import { useMemo } from "react";
import Image from "next/image";
import { isNumber, NodeViewProps, NodeViewWrapper } from "@tiptap/react";

import { cn } from "@/lib/utils";

import { useImageLoad } from "../../../hooks/use-image-load";

const ImageViewBlock = ({ editor, node, getPos }: NodeViewProps) => {
  const imgSize = useImageLoad(node.attrs.src);

  const paddingBottom = useMemo(() => {
    if (!imgSize.width || !imgSize.height) {
      return 0;
    }

    return (imgSize.height / imgSize.width) * 100;
  }, [imgSize.width, imgSize.height]);

  return (
    <NodeViewWrapper>
      <div draggable data-drag-handle>
        <figure>
          <div
            className="relative w-full"
            style={{
              paddingBottom: `${isNumber(paddingBottom) ? paddingBottom : 0}%`,
            }}
          >
            <div className="absolute size-full">
              <div
                className={cn(
                  "max-size-full relative h-full max-w-full rounded transition-all",
                )}
                style={{
                  boxShadow:
                    editor.state.selection.from === getPos()
                      ? "0 0 0 1px hsl(var(--primary))"
                      : "none",
                }}
              >
                <div className="max-size-full relative flex h-full max-w-full overflow-hidden">
                  <Image
                    width={500}
                    height={500}
                    alt={node.attrs.alt}
                    src={node.attrs.src}
                    className="absolute left-2/4 top-2/4 m-0 h-full max-w-full -translate-x-2/4 -translate-y-2/4 object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </figure>
      </div>
    </NodeViewWrapper>
  );
};

export { ImageViewBlock };
