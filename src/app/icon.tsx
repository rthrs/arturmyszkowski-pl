import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = {
    width: 128,
    height: 128
};

export const contentType = "image/png";

// Image generation
export default async function Icon() {
    const spaceGroteskBold = await readFile(join(process.cwd(), "assets/SpaceGrotesk-Bold.woff"));

    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "transparent"
                }}
            >
                <div
                    style={{
                        width: "100%",
                        height: "100%",
                        background: "linear-gradient(to bottom left, rgba(30, 58, 138, 1.0), rgba(17, 24, 39, 1.0))",
                        borderRadius: "24px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    <div
                        style={{
                            fontSize: 64,
                            fontWeight: 700,
                            color: "#f3f4f6",
                            letterSpacing: "-0.05em",
                            fontFamily: '"Space Grotesk"'
                        }}
                    >
                        AM
                    </div>
                </div>
            </div>
        ),
        {
            ...size,
            fonts: [
                {
                    name: "Space Grotesk",
                    data: spaceGroteskBold,
                    weight: 700,
                    style: "normal"
                }
            ]
        }
    );
}
