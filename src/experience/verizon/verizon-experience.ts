export type VerizonExperienceOutcome = {
    problem: string;
    solution: string;
    image: string;
    imageAlt: string;
}

// {
//     problem: '',
//     solution: '',
//     image: '',
//     imageAlt: '',
// },

export const VERIZON_EXPERIENCE: VerizonExperienceOutcome[] = [
    {
        problem: 'When a user is adding text or resizing a shape, the text can overflow and get cut off, requiring the user to manually resize the shape or find a text size that does not overflow. The product owner and design team had not devised a specified solution when this JIRA ticket was assigned to me.',
        solution: "Upon reviewing other whiteboarding apps' approach to this issue, I found their solutions unsatisfactory. Some apps locked the aspect ratio of a given shape, allowing the text to scale proportionally to the size of the shape but restricting the user's creative freedom. Some apps showed an indicator when the text was overflowing, alerting the user to either resize the shape or adjust the font size, which is inconvenient by requiring additional intervention by the user as well as adding an additional 'undo' action to the user's undo/redo history. After considering these options, I felt they were both lacking and instead devised an algorithm that would detect when the text begins to overflow and reduce the font size until the overflow was eliminated. This feature was very well received in customer feedback and NPS scores.",
        image: './img/AutoText.gif',
        imageAlt: 'Text resizes automatically to fit the drawing container'
    },
    {
        problem: 'Users need a quick and easy way to achieve pixel-perfect alignment of drawings for creating flowcharts and other whiteboard documents.',
        solution: "In addition to implementing a function to align multiple selected drawings along their left, right, top, bottom, or center axis, I also considered that 'grouped' drawings should maintain their position relative to their groupmates. I also built the toolbar menu for quick access to the new alignment features.",
        image: './img/GroupAlign.gif',
        imageAlt: 'Easy alignment of multiple selected drawings',
    },
    {
        problem: "I have several more features to showcase, but I haven't had time to add them all to my page yet!",
        solution: "Check back tomorrow! I'm actively updating this page every day!",
        image: './img/PerfectShape.gif',
        imageAlt: "Oh yeah, it's all coming together",
    },
]