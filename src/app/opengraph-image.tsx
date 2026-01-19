import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "Artur Myszkowski - Senior Software Engineer";
export const size = {
    width: 1200,
    height: 630
};

export const contentType = "image/png";

// Image generation
export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: "linear-gradient(135deg, #000000 0%, #1a1a1a 100%)",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "80px",
                    position: "relative"
                }}
            >
                {/* Background pattern */}
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        opacity: 0.1,
                        backgroundImage:
                            "radial-gradient(circle at 25px 25px, #ffffff 2%, transparent 0%), radial-gradient(circle at 75px 75px, #ffffff 2%, transparent 0%)",
                        backgroundSize: "100px 100px"
                    }}
                />

                {/* Content */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        zIndex: 1
                    }}
                >
                    <h1
                        style={{
                            fontSize: 80,
                            fontWeight: 300,
                            color: "#ffffff",
                            margin: "0 0 20px 0",
                            letterSpacing: "-0.02em"
                        }}
                    >
                        Artur Myszkowski
                    </h1>
                    <p
                        style={{
                            fontSize: 40,
                            color: "#9ca3af",
                            margin: "0 0 40px 0",
                            fontWeight: 300
                        }}
                    >
                        Software Engineer
                    </p>
                    <div
                        style={{
                            display: "flex",
                            gap: "20px",
                            flexWrap: "wrap",
                            justifyContent: "center",
                            maxWidth: "900px"
                        }}
                    >
                        {["React", "TypeScript", "WebGL", "Next.js", "WebAssembly"].map((tech) => (
                            <span
                                key={tech}
                                style={{
                                    padding: "12px 24px",
                                    background: "rgba(55, 65, 81, 0.5)",
                                    color: "#d1d5db",
                                    fontSize: 24,
                                    borderRadius: "9999px",
                                    border: "1px solid rgba(75, 85, 99, 0.3)"
                                }}
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div
                    style={{
                        position: "absolute",
                        bottom: 40,
                        fontSize: 24,
                        color: "#6b7280",
                        fontWeight: 300
                    }}
                >
                    arturmyszkowski.pl
                </div>
            </div>
        ),
        {
            ...size
        }
    );
}
